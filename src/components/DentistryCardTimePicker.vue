<template>
    <div class="flex flex-col h-full">
        <div v-if="isLoading" class="flex flex-col justify-center items-center h-full">loading</div>
        <div v-else class="flex  flex-col space-y-4">
            <!-- Calendar Navigation -->
            <div class="flex items-center justify-between px-4 gap-7">
                <button @click="navigate(-5)" :disabled="isEarliestWeek"
                    class="cursor-pointer border rounded-full  items-center"
                    :class="{ 'opacity-50 cursor-not-allowed': isEarliestWeek }">
                    <v-icon name="md-keyboardarrowleft" class=" h-9 w-9" :class="{ 'text-gray-500': isEarliestWeek }" />
                </button>
                <h1 class="text-lg font-bold">{{ displayDate }}</h1>
                <button @click="navigate(5)" class="cursor-pointer border rounded-full  items-center">
                    <v-icon name="md-keyboardarrowright" class=" h-9 w-9 text-cyan-800" />
                </button>

            </div>

            <!-- Days of the Week -->
            <div class="flex justify-between px-4">
                {{ timesData1.value }}
                <div v-for=" date  in  displayedDates " :key="date.toString()" class="text-center">
                    <div class="text-lg font-bold">{{ dayOfWeek(date) }}</div>
                    <div class="text-lg mt-1 border-gray-400/95 font-semibold flex items-center justify-center w-12 h-12 cursor-pointer rounded-full border dark:hover:border-cyan-600  hover:border-blue-500"
                        :class="{ 'bg-blue-500  text-white': isSelected(date), 'font-bold': isToday(date) }"
                        @click="selectDay(date)">
                        {{ date.getDate() }}
                    </div>
                    <!-- Conditional Dot Color Based on Available Times -->
                    <div
                        :class="{ 'h-3 w-3 rounded-full mx-auto mt-2': true, 'bg-green-500': hasTimes(date), 'bg-gray-400': !hasTimes(date) }">
                    </div>
                </div>
            </div>

            <!-- Times List or No Available Times Message -->
            <div class="space-y-2 px-4">
                <div class="flex flex-col space-y-2" v-if="selectedTimes.length > 0">
                    <div v-for="(time, index) in selectedTimes" v-show="index < 4 || showAllTimes"
                        @click="setActiveTime(time)"
                        :class="{ 'bg-cyan-700 text-white border-cyan-700': activeTime === time }"
                        class="flex border-gray-300 items-center justify-center font-semibold rounded-md p-3 cursor-pointer   border-2 hover:border-cyan-700 transition-all duration-300">
                        {{ time.startTime }} - {{ time.endTime }}
                    </div>
                </div>
                <div v-else class="text-center text-md text-gray-500 max-w-[18rem] mx-auto line-clamp-3">
                    No appointments available on the selected date.
                </div>

                <button v-if="selectedTimes.length > 4 && !showAllTimes" @click="showAllTimes = true"
                    class="flex justify-center w-full text-blue-500 mt-2">
                    Show more
                </button>

                <button v-if="showAllTimes" @click="showAllTimes = false"
                    class="flex justify-center w-full text-blue-500 mt-2">
                    Show less
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
const isLoading = ref(true);

import { ref, computed } from 'vue';
const emit = defineEmits(['time-selected']);

// type TimeSlot = { id: number; start: string; end: string; };
// type DayTimes = { [key: string]: TimeSlot[] };

// type TimeSlot1 = { dentistId: string; startTime: string; endTime: string; date: string; isBooked: boolean; };
type DayTimes1 = { [key: string]: TimeSlot[] };


const activeTime = ref<TimeSlot | null>(null);

// State to control whether all times are shown
const showAllTimes = ref(false);


// props for dentstryId
const props = defineProps({
    dentistryId: {
        type: String,
        required: true
    }
});

const timesData1 = ref<DayTimes1>({});

console.log(timesData1.value);


// fetch times from backend
fetchTimes();

async function fetchTimes() {
    isLoading.value = true;
    // fetch times from backend
    const response = await fetch(`http://localhost:4000/api/v1/clinics/${props.dentistryId}/appointment_slots`);
    const data = await response.json() as TimeSlot[];

    // convert to the dayTimes format
    const dayTimes: DayTimes1 = {};
    data.forEach((time) => {
        if (dayTimes[time.date]) {
            dayTimes[time.date].push(time);
        } else {
            dayTimes[time.date] = [time];
        }
    });

    timesData1.value = dayTimes;


    // artificially delay the loading state
    await new Promise((resolve) => setTimeout(resolve, 1000));



    console.log(dayTimes);
    isLoading.value = false;
}



const setActiveTime = (time: TimeSlot) => {
    activeTime.value = time;
    // temporary solution till data is fetched from backend
    const tempType = { ...time, date: selectedDate.value.toDateString() };
    emit('time-selected', tempType);
};

// Mock data for the times
// const timesData: DayTimes = {
//     '2023-11-29': [
//         { id: 1, start: '09:30', end: '10:00' },
//         { id: 2, start: '10:15', end: '10:45' },
//     ],
//     '2023-12-07': [
//         { id: 1, start: '09:30', end: '10:00' },
//         { id: 2, start: '10:15', end: '10:45' },
//         { id: 3, start: '11:00', end: '11:30' },
//         { id: 4, start: '12:45', end: '13:15' },
//         { id: 5, start: '14:00', end: '14:30' },
//         { id: 6, start: '15:15', end: '15:45' },
//         { id: 7, start: '16:00', end: '16:30' },
//         { id: 8, start: '17:15', end: '17:45' },


//     ],
//     '2023-03-30': [
//         { id: 3, start: '11:00', end: '11:30' },
//         { id: 4, start: '12:45', end: '13:15' },
//     ],

// };

const initialDate = new Date(); // Store the initial date to compare against
initialDate.setHours(0, 0, 0, 0); // Normalize to start of the day for comparison

const startDate = ref(new Date(initialDate)); // Start date for the displayed dates
const selectedDate = ref(new Date(initialDate)); // Initialize with the current date
const selectedTimes = ref<TimeSlot[]>([]); // New ref for the selected day's times

// Helper functions
const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const navigate = (days: number) => {
    startDate.value = addDays(startDate.value, days);
};

const selectDay = (date: Date) => {
    // Format the date as YYYY-MM-DD without converting to UTC
    const dateString = date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    selectedTimes.value = timesData1.value[dateString] || [];
    selectedDate.value = new Date(date);
};

const hasTimes = (date: Date) => {
    const dateString = date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    return timesData1.value[dateString] && timesData1.value[dateString].length > 0;
};

const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.value.toDateString();
};

const isToday = (date: Date) => {
    return date.toDateString() === initialDate.toDateString();
};

const dayOfWeek = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

// Computed properties
const displayedDates = computed(() => {
    let dates = [];
    for (let i = 0; i < 5; i++) {
        dates.push(addDays(startDate.value, i));
    }
    return dates;
});

const displayDate = computed(() => {
    return selectedDate.value.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
    });
});

const isEarliestWeek = computed(() => {
    return displayedDates.value[0].getTime() <= initialDate.getTime();
});
</script>
  
<style></style>
  
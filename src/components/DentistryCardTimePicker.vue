<template>
    <div class="flex flex-col space-y-4">
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
            <div v-for=" date  in  displayedDates " :key="date.toString()" class="text-center">
                <div class="text-lg font-bold">{{ dayOfWeek(date) }}</div>
                <div class="text-lg mt-1 border-gray-400/95 font-semibold flex items-center justify-center w-12 h-12 cursor-pointer rounded-full border  hover:border-blue-500"
                    :class="{ 'bg-blue-500 text-white': isSelected(date), 'font-bold': isToday(date) }"
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
                <div @click="setActiveTime(time)" v-for="time in selectedTimes" :key="time.id"
                :class="{ 'bg-cyan-700 text-white': activeTime === time }"    
                class="flex border-gray-300  items-center justify-center font-semibold rounded-sm p-3 cursor-pointer border hover:border-transparent hover:border-cyan-700 transition-all duration-300">
                    {{ time.start }} - {{ time.end }}
                </div>
            </div>
            <div v-else class="text-center text-gray-500">
                No available times
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">

import { ref, computed } from 'vue';

type TimeSlot = { id: number; start: string; end: string; };
type DayTimes = { [key: string]: TimeSlot[] };

const activeTime = ref<TimeSlot | null>(null);

const setActiveTime = (time: TimeSlot) => {
    activeTime.value = time;
};

// Define your types and reactive data properties
const timesData: DayTimes = {
    '2023-11-28': [
        { id: 1, start: '09:30', end: '10:00' },
        { id: 2, start: '10:15', end: '10:45' },
    ],
    '2023-03-30': [
        { id: 3, start: '11:00', end: '11:30' },
        { id: 4, start: '12:45', end: '13:15' },
    ],
    // ... other days
};

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
    const dateString = date.toLocaleDateString('en-CA', { // 'en-CA' uses the YYYY-MM-DD format
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    selectedTimes.value = timesData[dateString] || [];
    selectedDate.value = new Date(date); // Make sure to set it as a new Date object
};

const hasTimes = (date: Date) => {
    const dateString = date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    return timesData[dateString] && timesData[dateString].length > 0;
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
  
<style>
/* You can add your styles here */
</style>
  
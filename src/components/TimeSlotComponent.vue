<template>
    <div class="flex flex-col p-4">
        <div class="flex justify-between py-4 px-14">
            <h1 class="text-xl font-bold">November 2023</h1>
            <div class="gap-1 flex">
                <button class="p-2 bg-cyan-500 hover:bg-cyan-600 transition duration-300 rounded-lg font-bold ">
                    <ArrowLeftCircleIcon class="h-8 w-8" />
                </button>
                <button class="p-2 bg-cyan-500 hover:bg-cyan-600 transition duration-300 rounded-lg font-bold ">
                    <ArrowRightCircleIcon class="h-8 w-8" />
                </button>
            </div>
        </div>

        <div v-if="viewingTimes" class="grid grid-cols-4 gap-3 justify-items-center text-2xl font-bold">
            <!-- Display time slots for the selected day -->
            <div v-for="time in availableTimes['2023-11-02']" :key="time"
                class="bg-white rounded-lg text-black hover:cursor-pointer text-xl transition hover:-translate-y-1 duration-300 hover:scale-110 ease-in-out font-bold w-16 h-16 flex justify-center items-center shadow-lg">
                {{ time }}
            </div>
        </div>
        <div v-else class="grid grid-cols-7 gap-3 justify-items-center text-2xl font-bold">
            <!-- Day Headers -->
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <!-- If first day is not sunday we do blanks -->
            <div v-for="blank in getBlanksForFirstDayOfMonth(2023, 10)" :key="`blank-${blank}`"></div>
            <!-- Display all days in the month -->
            <div @click="selectDay(day)" v-for="day in getDaysInMonth(2023, 10)" :key="day"
                :class="{ 'bg-gray-200/95 cursor-default text-gray-400/80 ': isPastDay(2023, 10, day), 'current-day': isToday(2023, 10, day) }"
                class="bg-white rounded-lg text-black hover:cursor-pointer text-xl transition hover:-translate-y-1 duration-300 hover:scale-110 ease-in-out font-bold w-16 h-16 flex justify-center items-center shadow-lg">
                {{ day }}
            </div>
        </div>

    </div>

    <div v-if="viewingTimes" class="px-14 py-4 justify-between flex">
        <button @click="backToCalendar"
            class="transition py-3 px-6 text-xl ease-in-out delay-150 rounded-lg bg-red-600 text-white font-bold hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-100">
            Back to days
        </button>
        <button
            class="transition py-3 px-6 text-xl ease-in-out delay-150 rounded-lg bg-cyan-600 text-white font-bold hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 duration-300">
            Continue
        </button>

    </div>
</template>

<script setup lang="ts">
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue';
const viewingTimes = ref(false);
const selectedDay = ref('');


const availableTimes = ref({
    '2023-11-01': ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    '2023-11-02': ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    '2023-11-03': ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    '2023-11-04': ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    '2023-11-05': ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    '2023-11-06': ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    '2023-11-07': ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    '2023-11-08': ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    '2023-11-09': ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
});

function selectDay(day: number) {
    selectedDay.value = `2023-11-${day.toString().padStart(2, '0')}`;
    viewingTimes.value = true;
}

function backToCalendar() {
    viewingTimes.value = false;
}

// get all days in month
function getDaysInMonth(year: number, month: number) {
    const date = new Date(year, month, 1);
    let days = [];

    while (date.getMonth() === month) {
        days.push(date.getDate());
        date.setDate(date.getDate() + 1);
    }

    return days;
}

function getBlanksForFirstDayOfMonth(year: number, month: number) {
    const firstDay = new Date(year, month, 1).getDay();
    return Array(firstDay).fill(null);
}

function isPastDay(year: number, month: number, day: number) {
    const today = new Date();
    const checkDate = new Date(year, month, day);
    return checkDate < today;
}

function isToday(year: number, month: number, day: number) {
    const today = new Date();
    const checkDate = new Date(year, month, day);
    return checkDate.toDateString() === today.toDateString();
}

</script>
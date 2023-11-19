<template>
    <header class="bg-white shadow">
        <div class="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div class="flex gap-20 items-center">
                <span class="flex gap-2 items-center cursor-pointer">
                    <img class="h-12 w-12" src="../assets/tooth.svg" alt="tooth logo">
                    <h1 class="text-3xl font-bold">NAME</h1>
                </span>

                <nav class="md:flex gap-8 items-center hidden">
                    <RouterLink to="/dashboard"
                        class="text-gray-700 hover:text-cyan-700 font-semibold   relative text-2xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                        Appointments</RouterLink>
                    <RouterLink to="/mapview"
                        class="text-gray-600 hover:text-cyan-700 font-semibold   relative text-2xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                        Dentistries</RouterLink>
                    <RouterLink to="/Settings"
                        class="text-gray-600 hover:text-cyan-700 font-semibold   relative text-2xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                        Settings</RouterLink>

                </nav>

            </div>

            <div class="md:flex gap-4 items-center hidden">
                <BellAlertIcon class="h-12 w-12 text-cyan-500 cursor-pointer hover:text-cyan-700" />
                <span class="rounded-full bg-purple-600 h-12 w-12" alt="" />
            </div>

            <!-- Mobile menu button -->
            <button @click="toggleHamburger"
                class="inline-flex items-center justify-end p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white md:hidden">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>


        </div>


        <!-- Mobile navbar-->

        <nav v-if="hamburgerToggle" class="flex flex-col gap-4 items-center py-4 md:hidden">
            <RouterLink to="/dashboard"
                class="text-gray-700 hover:text-cyan-700 font-semibold   relative text-2xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                Appointments</RouterLink>
            <RouterLink to="/mapview"
                class="text-gray-600 hover:text-cyan-700 font-semibold   relative text-2xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                Dentistries</RouterLink>
            <RouterLink to="/settings"
                class="text-gray-600 hover:text-cyan-700 font-semibold   relative text-2xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                Settings</RouterLink>
            <!-- <h1 class="text-blue-600 hover:text-blue-700 font-semibold">Payments</h1>
                    <h1 class="text-blue-600 hover:text-blue-700 font-semibold">Settings</h1> -->
        </nav>


    </header>
</template>
<script setup lang="ts">
import { BellAlertIcon } from '@heroicons/vue/24/outline'

import { ref } from 'vue'

import { RouterLink } from 'vue-router'

const hamburgerToggle = ref(false)

const toggleHamburger = () => {
    hamburgerToggle.value = !hamburgerToggle.value
}



</script>
<style lang="">

    </style>

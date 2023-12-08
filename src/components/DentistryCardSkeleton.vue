<template>
    <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 flex flex-col md:flex-row justify-between max-w-full">
        <div class="flex flex-1 max-w-lg gap-3">
            <div class="flex flex-col space-y-2">
                <!-- Skeleton for the Dentistry Name -->
                <div class="h-6 bg-gray-300 rounded-md w-3/4"></div>

                <!-- Skeleton for the Address -->
                <div class="h-4 bg-gray-300 rounded-md w-1/2"></div>

                <!-- Skeleton for the Image -->
                <div class="h-40 w-80 bg-gray-300 rounded-lg"></div>

                <!-- Skeleton for Distance Information -->
                <div class="flex items-center mt-2">
                    <div class="h-4 bg-gray-300 rounded-md w-10 mr-2"></div>
                    <div class="h-4 bg-gray-300 rounded-md w-16"></div>
                </div>
            </div>
        </div>

        <!-- Skeleton for Time Picker -->
        <div class="flex-none py-2 w-48">
            <div class="h-[25%] bg-gray-300 rounded-md mb-2"></div>
            <div class="h-[10%] bg-gray-300 rounded-md mt-7 mb-2"></div>
            <div class="h-[10%] bg-gray-300 rounded-md mb-2"></div>
            <div class="h-[10%] bg-gray-300 rounded-md mb-2"></div>
            <div class="h-[10%] bg-gray-300 rounded-md"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
// No script needed for skeleton
</script>

<style scoped>
/* You can add any additional styling for the skeleton here */
</style>

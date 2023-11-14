<template>
    <mapViewSearchBar />
    <div class="md:flex flex-1   md:overflow-auto flex-row ">
        <div class=" md:w-3/5  p-4 flex flex-col justify-between">
            <div class="py-4 px-2">
                <h1 class="text-lg font-bold py-1">Over x results</h1>
                <div class="flex flex-col listofitems space-y-2 py-2 ">
                    <div v-for="dentistry in dentistries"
                        class="bg-gray-200 hover:bg-gray-300 cursor-pointer flex p-4 justify-between rounded-lg ">
                        <div class="flex items-center gap-3 ">
                            <span
                                class="bg-blue-700 w-32 h-20 rounded-lg text-center text-white flex justify-center items-center">IMG</span>
                            <div class="flex flex-col space-y-1">
                                <h1 class="text-2xl font-semibold">{{ dentistry.name }}</h1>
                                <Rating :cancel="false" v-model='dentistry.rating' />
                                <h1>Type: {{ dentistry.type }}</h1>
                            </div>
                        </div>
                        <div class="flex items-end gap-2">
                            <h1 class="font-bold"> 5 minutes away </h1>
                        </div>

                    </div>
                </div>
            </div>
            <Paginator :rows="2" :totalRecords="dentistries.length" class="p-4   " />
        </div>
        <div class="md:w-1/2  bg-cyan-700 text-center items-center text-5xl text-white fontb-bold justify-center flex">MAP
            HERE</div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import mapViewSearchBar from '../components/mapViewSearchBar.vue';
import Paginator from 'primevue/paginator';
import Rating from 'primevue/rating';

const dentistries = ref([
    {
        name: 'Dentistry 1',
        rating: 3,
        type: 'tooth',
        coordinates: {
            lat: 1,
            lng: 1
        }
    },
    {
        name: 'Dentistry 2',
        rating: 4.5,
        type: 'tooth',
        coordinates: {
            lat: 1,
            lng: 1
        }
    },
    {
        name: 'Dentistry 3',
        rating: 4.5,
        type: 'tooth',
        coordinates: {
            lat: 1,
            lng: 1
        }
    },
    {
        name: 'Dentistry 4',
        rating: 4.5,
        type: 'tooth',
        coordinates: {
            lat: 1,
            lng: 1
        }
    },
    {
        name: 'Dentistry 5',
        rating: 4.5,
        type: 'tooth',
        coordinates: {
            lat: 1,
            lng: 1

        }
    }
]);
</script>



<style lang="">
    
</style>
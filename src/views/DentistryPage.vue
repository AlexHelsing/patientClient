<template>
    <div class="p-4 shadow-lg flex flex-col md:flex-row gap-6 bg-gray-100 w-full">
        <RouterLink to="/mapview" class="flex justify-start items-center gap-1 transition hover:-translate-x-2">
            <ArrowLeftIcon class="h-12 w-12 font-bold" />
            <h1 class="text-2xl font-mono font-bold">MAPVIEW</h1>


        </RouterLink>
        <div class="flex justify-center w-full ">
            <stepperComponent />
        </div>
    </div>
    <main class="flex flex-1 bg-red-600">
        <div class="flex flex-col px-8 py-6 space-y-6 bg-green-500 w-1/3">
            <span class="flex flex-col gap-1">
                <h2 class="text-lg font-bold"> {{ dentistry.name }}</h2>
                <p>Make an appointment</p>
            </span>
            <img class="h-36 w-40" src="../assets/sampleDentistryImage.jpg" alt="Dentistry image">

            <span>
                <p><span class="font-bold">Address:</span> {{ dentistry.address }}</p>
                <p class="flex items-center gap-1 font-bold ">
                    <StarIcon class="w-8 h-8" /> {{ dentistry.rating }}
                </p>
                <p> <span class="font-bold">Phone: </span>{{ dentistry.phone }}</p>
            </span>
        </div>

        <div class="bg-gray-300 w-2/3">
            TIMESLOT COMPONENT
        </div>
    </main>
</template>
<script setup lang="ts">
import { ref } from "vue";
import dentistryData from "../mockupdata";

import stepperComponent from "../components/stepperComponent.vue";
import { useRoute } from "vue-router";
import { StarIcon, ArrowLeftIcon } from "@heroicons/vue/24/outline"




const dentistries = ref(dentistryData);

const route = useRoute();
const dentistryId = route.params.id;

const dentistry = dentistries.value.find((dentistry) => dentistry.id === dentistryId);

if (!dentistry) {
    throw new Error(`Dentistry with id ${dentistryId} not found`);
}

</script>


<style lang="">
    
</style>
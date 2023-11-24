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
    <main class="flex flex-1 md:flex-row flex-col">
        <div class="flex flex-col px-8 py-9 space-y-6 bg-gray-400 shadow-lg md:w-1/3">
            <span class="flex flex-col gap-1">
                <h2 class="text-lg font-bold"> {{ dentistry.name }}</h2>
                <p>Make an appointment</p>
            </span>
            <img class="h-60 w-60 object-contain" src="../assets/sampleDentistryImage.jpg" alt="Dentistry image">

            <span>
                <p><span class="font-bold">Address:</span> adress</p>
                <p class="flex items-center gap-1 font-bold ">
                    <StarIcon class="w-8 h-8" /> {{ dentistry.rating }}
                </p>
                <p> <span class="font-bold">Phone: </span>04412313</p>
            </span>
        </div>

        <div class="bg-gray-300 md:w-2/3 flex flex-col justify-between  ">
            <TimeSlotComponent />
        </div>
    </main>
</template>
<script setup lang="ts">
import { ref } from "vue";
import dentistryData from "../mockupdata";
import TimeSlotComponent from "../components/TimeSlotComponent.vue";

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
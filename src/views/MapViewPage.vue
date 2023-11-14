<template>
    <mapViewSearchBar />
    <div class="md:flex flex-1   md:overflow-auto flex-row ">
        <div class=" md:w-3/5  p-4 flex flex-col justify-between">
            <div class="py-4 px-2">
                <h1 class="text-lg font-bold py-1">Over x results...</h1>
                <div class="flex flex-col listofitems space-y-2 py-2 ">
                    <DentistryListItem v-for="dentistry in dentistries" :dentistry="dentistry" />
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
import DentistryListItem from '../components/DentistryListItem.vue';
import dentistryData from "../mockupdata";

const dentistries = ref(dentistryData);


</script>



<style lang="">
    
</style>
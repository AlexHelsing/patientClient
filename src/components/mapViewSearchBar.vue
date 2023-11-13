<template>
    <div class="p-4 shadow-lg flex flex-col md:flex-row gap-6 bg-gray-200">
        <Dropdown v-model="selectedType" :options="types" optionLabel="name" placeholder="Type?" class="md:w-14rem" />
        <Dropdown v-model="selectedRadius" :options="radiusOptions" optionLabel="name" placeholder="Search Radius"
            class="md:w-14rem " />
        <Dropdown v-model="selectedRating" :options="ratingOptions" optionLabel="name" placeholder="Rating"
            class="md:w-14rem " />
        <Dropdown v-model="selected4" optionLabel="name" placeholder="Search filter 3" class="md:w-14rem " />

    </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { ref } from "vue";

const selectedType = ref();
const selectedRadius = ref();
const selectedRating = ref();
const selected4 = ref();

const types = ref(
    [
        { name: 'tooth' },
        { name: 'drilling ' },
        { name: 'or' },
        { name: 'something' },

    ]
);

const radiusOptions = ref(
    [
        { name: '1km' },
        { name: '2km' },
        { name: '3km' },
        { name: '4km' },

    ]
);

const ratingOptions = ref(
    [
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' },

    ]
);



</script>



<style lang="">
    
</style>
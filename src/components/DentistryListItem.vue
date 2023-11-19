<template>
    <RouterLink :to="`/dentistry/${dentistry.id}`"
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

    </RouterLink>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import Rating from 'primevue/rating';

defineProps({
    dentistry: {
        type: Object as PropType<Dentistry>,
        required: true
    }
})

</script>

<template>
    <div class="bg-white shadow-sm hover:shadow-md rounded-lg p-4 flex justify-between items-center transition-shadow">
        <RouterLink :to="`/dentistry/${dentistry.id}`" class="flex-grow flex items-center gap-3">
            <span class="w-32 h-20 rounded-lg bg-gray-200 flex justify-center items-center text-3xl text-gray-400">
                IMG
            </span>
            <div class="flex flex-col space-y-1">
                <h1 class="text-xl font-semibold">{{ dentistry.name }}</h1>
                <Rating :cancel="false" v-model='dentistry.rating' />
                <p>Type: {{ dentistry.type }}</p>
                <p v-if="hasAvailableSlotsToday(dentistry, new Date())" class="font-bold text-green-500">
                    Available Slots Today
                </p>
                <p v-else class="font-bold text-red-500">No Slots Available Today</p>
            </div>
        </RouterLink>
        <div class="flex gap-2 justify-end self-end">
            <button @click="emitViewOnMapEvent"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                View
            </button>
        </div>
    </div>
</template>


<script setup lang="ts">
import { PropType } from 'vue';
import Rating from 'primevue/rating';

const props = defineProps({
    dentistry: {
        type: Object as PropType<Dentistry>,
        required: true
    }
});

const emit = defineEmits(['viewOnMap']);

function hasAvailableSlotsToday(dentistry: Dentistry, date: Date) {
    return dentistry.slots.some(slot => {
        const slotDate = new Date(slot.date);
        return slotDate.getDate() === date.getDate() && slotDate.getMonth() === date.getMonth() && slotDate.getFullYear() === date.getFullYear();
    });

}

const emitViewOnMapEvent = () => {
    emit('viewOnMap', props.dentistry);
}


</script>
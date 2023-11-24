<template>
    <div class="bg-white shadow-sm hover:shadow-md rounded-lg p-4 flex justify-between transition-shadow max-w-full">
        <RouterLink :to="`/dentistry/${dentistry.id}`" class="flex flex-1 max-w-lg gap-3">

            <div class="flex flex-col space-y-2">
                <h1 class="text-xl font-bold">{{ dentistry.name }}</h1>
                <p class="text-gray-500">Lindholmsgatan 64, 42671 </p>
                <img :src="dentistry.image" alt="" class="rounded-lg  object-cover" />
                <span v-if="farFromUser" class="text-md flex items-center ">
                    <v-icon name="io-location" class="h-5 w-5 text-red-600 mr-2" />
                    <p class="text-gray-500 text-lg font-medium">{{ farFromUser.toFixed(2) }} km</p>
                </span>
            </div>
        </RouterLink>
        <div class="flex-none py-2">
            <DentistryCardTimePicker />
        </div>
    </div>
</template>


<script setup lang="ts">
import { PropType } from 'vue';
import DentistryCardTimePicker from './DentistryCardTimePicker.vue';






const props = defineProps({
    dentistry: {
        type: Object as PropType<Dentistry>,
        required: true
    },
    farFromUser: {
        type: Number,
        required: false
    }
});
console.log(props.farFromUser);
const emit = defineEmits(['viewOnMap']);

// function hasAvailableSlotsToday(dentistry: Dentistry, date: Date) {
//     return dentistry.slots.some(slot => {
//         const slotDate = new Date(slot.date);
//         return slotDate.getDate() === date.getDate() && slotDate.getMonth() === date.getMonth() && slotDate.getFullYear() === date.getFullYear();
//     });
// }


const emitViewOnMapEvent = () => {
    emit('viewOnMap', props.dentistry);
}


</script>
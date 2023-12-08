<template>
    <div :id="`dentistry-${dentistry._id}`"
        class="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between transition-shadow max-w-full">
        <div class="flex flex-1 max-w-lg gap-3">

            <div class="flex flex-col space-y-2">
                <h1 class="text-xl font-bold">{{ dentistry.name }}</h1>
                <p class="text-gray-500">{{ dentistry.address }} </p>
                <img :src="dentistry.photo" alt="" class="rounded-lg  object-cover" />
                <span v-if="farFromUser" class="text-md flex items-center ">
                    <v-icon name="io-location" class="h-5 w-5 text-red-600 mr-2" />
                    <p class="text-gray-500 text-lg font-medium">{{ farFromUser.toFixed(2) }} km</p>
                </span>
            </div>
        </div>
        <div class="flex-none py-2">
            <DentistryCardTimePicker :time-slots="dentistry.slots" @time-selected="onTimeSelected" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { PropType } from 'vue';
import DentistryCardTimePicker from './DentistryCardTimePicker.vue';

const emit = defineEmits(['time-selected']);





const props = defineProps({
    dentistry: {
        type: Object as PropType<Dentistry>,
        required: true
    },
    farFromUser: {
        type: Number,
        required: false
    },
});

function onTimeSelected(data: unknown) {
    // add dentistry data to the payload and re-emit
    emit('time-selected', { data, dentistry: props.dentistry });
}



</script>
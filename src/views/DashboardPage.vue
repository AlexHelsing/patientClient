<template>
    <div class=" flex flex-1  max-w-5xl ">
        <div class=" w-1/2 flex flex-col justify-between gap-3 p-6">
            <div class="flex flex-col space-y-2">
                <div class="flex bg-gray-300 flex-col rounded-lg items-center p-4 ">
                    <span class="rounded-full bg-purple-600 h-12 w-12" alt="" />
                    <h1 class="text-lg font-bold">{{ userStore.getUser?.firstname }} {{ userStore.getUser?.lastname }}</h1>



                    <p class="text-gray-500">{{ userStore.getUser?.phone_number }}</p>
                </div>


                <div class="flex card  flex-col  bg-gray-300 ">
                    <span @click="handleToggle('upcoming')"
                        class="flex gap-2 py-2 px-1 hover:bg-cyan-500 hover:text-white hover:font-bold cursor-pointer"
                        :class="{ 'bg-cyan-500 text-white font-bold': !showPast }">
                        <CalendarDaysIcon class="h-8 w-8" />
                        <h1 class="text-lg font-semibold">Upcoming appointments</h1>
                    </span>
                    <span @click="handleToggle('past')"
                        class="flex gap-2 py-2 px-1 hover:text-white hover:font-bold hover:bg-cyan-500 cursor-pointer"
                        :class="{ 'bg-cyan-500 text-white font-bold': showPast }">
                        <ArchiveBoxIcon class="h-8 w-8" />
                        <h1 class="text-lg font-semibold">Appointment history</h1>
                    </span>

                    <Dialog :on-vnode-unmounted="handleModalClose" v-model:visible="visible" header="What day?"
                        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :modal="true" :draggable="false">
                        <Calendar v-model="date" inline showWeek />
                        <template #footer>
                            <div class="flex gap-2 justify-end">

                                <button v-if="date" @click="handleSubmitModal" class=" bg-green-500 p-3 text-white font-bold rounded-lg
                                hover:bg-green-600">Continue</button>
                            </div>
                        </template>
                    </Dialog>
                    <!-- <span class="flex gap-2 py-2 px-1 hover:bg-blue-400 cursor-pointer">
                    <ArchiveBoxIcon class="h-8 w-8" />
                    <h1 class="text-lg font-semibold">New appointment</h1>
                </span> -->

                </div>
            </div>
            <button @click="visible = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Make an appointment
            </button>
        </div>





        <div v-if="!showPast" class="w-1/2 p-8 gap-4 flex flex-col">
            <div class="flex gap-4 py-2">
                <h1 class="text-4xl">Upcoming Appointments</h1>
                <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Make an appointment
                    </button> -->

            </div>
            <div v-if="appointments.length == 0" class="border border-gray-400 rounded-lg p-7 ">
                <img class="items-center flex justify-center" src="/src/assets/kerfin7_nea_2761 1.png" alt="">
                <p class="text-lg font-medium">Seems you dont have any bookings, click <span @click="visible = true"
                        class="font-bold text-xl  cursor-pointer text-blue-600">
                        here</span> to make an appointment</p>
            </div>
            <div v-else class="">
                <Dialog v-model:visible="visibleAppointmentModal" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
                    :modal="true" :draggable="false">
                    <template #footer>
                        <div class="flex gap-2 justify-end">

                            <button class=" bg-red-500 p-3 text-white font-bold rounded-lg
                                ">Cancel Appointment</button>
                        </div>
                    </template>
                </Dialog>
                <div class="flex flex-col gap-4 ">
                    <div @click="visibleAppointmentModal = true" v-for="appointment in appointments" :key="appointment.id"
                        class="border cursor-pointer border-gray-300 rounded-lg p-4 shadow-md">
                        <h3 class="text-xl font-semibold">{{ appointment.title }}</h3>
                        <p class="text-gray-500">{{ appointment.description }}</p>
                        <div class="flex justify-between items-center mt-2">
                            <div>
                                <p class="text-gray-600">{{ appointment.date }}</p>
                                <p class="text-gray-600">{{ appointment.time }}</p>
                            </div>
                            <div>
                                <p class="text-gray-600">{{ appointment.duration }}</p>
                                <p class="text-gray-600">{{ appointment.location }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div v-else class="w-1/2 p-8 gap-4 flex flex-col">
            <div class="flex gap-4">
                <h1 class="text-4xl">Past Appointments</h1>
                <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Make an appointment
                    </button> -->

            </div>


        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useUserStore } from '../stateStores/userStore';
import { ref } from 'vue';
import { ArchiveBoxIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import router from '../router';
const date = ref(null);
const showPast = ref(false);

const visible = ref(false);
const visibleAppointmentModal = ref(false);

const userStore = useUserStore();

console.log(userStore.getUser); // 

const handleToggle = (pressed: string) => {
    if (pressed === 'upcoming') {
        showPast.value = false;
    } else {
        showPast.value = true;
    }
};


// create some mockup appointments
const appointments = ref([
    {
        id: 1,
        title: 'Appointment 1',
        description: 'This is the first appointment',
        date: '2023-12-10',
        time: '10:00',
        duration: '1 hour',
        location: 'Dentistry 1',
    }
]);

const handleSubmitModal = () => {
    console.log('go next step ie mapview');
    date.value = null;
    visible.value = false;
    router.push('/mapview');
};


const handleModalClose = () => {
    console.log('modal closed');
    date.value = null;
};

</script>
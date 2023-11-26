<template>
    <div class="container mx-auto p-12">
        <!-- Contact Details Section -->
        <h2 class="text-4xl font-bold mb-6 ">Confirm appointment details</h2>
        <div class="flex flex-wrap -mx-4">
            <!-- Left Section - Form Inputs -->
            <div class="w-full lg:w-1/3 px-4 mb-6 lg:mb-0">

                <div class="space-y-4 mb-6">
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            for="name">firstname</label>
                        <input :value="userStore.user?.firstname" type="text" placeholder="First name *"
                            class="input-field bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            required />
                    </div>
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            for="lname">lastname</label>
                        <input :value="userStore.user?.lastname" type="text" placeholder="Last name *"
                            class="input-field bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            required />
                    </div>
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            for="email">email</label>
                        <input :value="userStore.user?.email" type="email" placeholder="Email *"
                            class="input-field bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            required />
                    </div>
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            for="phone">phone</label>
                        <input :value="userStore.user?.phone_number" type="tel" placeholder="Phone *"
                            class="input-field bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            required />
                    </div>
                </div>
                <div class="mb-6">
                    <h3 class="text-xl font-semibold mb-4">Appointment information</h3>
                    <p class="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In repellendus ipsum facere harum a
                        repellat nobis neque aspernatur, illo eos!
                    </p>
                </div>
                <button
                    class="btn-primary w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book
                    appointment</button>
            </div>

            <!-- Right Section - Appointment Details -->
            <div class="w-full lg:w-1/3 px-4">
                <div class="bg-white rounded-lg shadow-lg dark:bg-gray-700">
                    <img :src="bookingStore.bookingData?.dentistry.image" alt="Office Interior"
                        class="rounded-t-lg object-cover w-full h-48" />
                    <div class="p-4 border-b">
                        <h3 class="text-lg font-semibold mb-2">{{ bookingStore.bookingData?.dentistry.name }}</h3>
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <p class="font-semibold">{{ bookingStore.bookingData?.data.date }}, </p>
                                <p class="font-semibold">
                                    {{ bookingStore.bookingData?.data.start }}
                                    - {{ bookingStore.bookingData?.data.end }}
                                </p>
                            </div>
                            <v-icon name="bi-calendar-check"
                                class="w-10 h-10 bg-cyan-400 mr-1 text-gray-800 rounded-full p-2" />
                        </div>
                    </div>
                    <div class="p-4 flex justify-between">
                        <p class="text-sm">
                            Göteborg<br>
                            Lindholmenstreet<br>
                            471 62
                        </p>
                        <v-icon name="fa-location-arrow"
                            class="w-10 h-10 self-end mr-1 bg-cyan-400 rounded-full p-2 text-gray-800" />

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">

import { useBookingStore } from '../stateStores/bookingStore';
import { useUserStore } from '../stateStores/userStore';

const bookingStore = useBookingStore();
const userStore = useUserStore();

console.log(bookingStore.bookingData?.data.date);
</script>
  
<style lang="css">
.input-field {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border: 2px solid #e5e5e5;
    border-radius: 0.25rem;
    /* Limit the height of the input fields */
    height: 2.5rem;
}

.input-field:focus {
    outline: 2px solid blue;
    /* Replace with your brand color */
}

.btn-primary {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: blue;
    /* Replace with your brand color */
    color: white;
    font-weight: bold;
    text-align: center;
    border-radius: 0.25rem;
    cursor: pointer;
}

.btn-primary:hover {
    background-color: darkblue;
    /* A darker variant of your brand color */
}
</style>
  
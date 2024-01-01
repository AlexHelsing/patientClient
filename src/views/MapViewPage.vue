<template>
    <div class="md:flex flex-1 border-t dark:border-none   md:overflow-auto flex-row ">

        <div
            class="md:w-[45%] flex flex-col  max-h-screen overflow-y-scroll scrollbar  scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full  ">
            <div class="bg-white dark:bg-gray-800 flex flex-col px-5 py-7 space-y-6">
                <h1 class="text-2xl font-bold">Make an appointment </h1>

                <div class="flex flex-col md:flex-row w-full items-center gap-5 md:gap-10 ">
                    <div class="relative flex-grow w-full md:w-3/5 z-[100]">
                        <input @input="showDropdown = true" type="text" v-model="cityInput" placeholder="Search by city..."
                            class="w-full pl-3 pr-10 py-3 border border-gray-300 dark:border-gray-900 rounded-t-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:focus:border-cyan-900" />
                        <MagnifyingGlassIcon
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 dark:text-gray-200" />

                        <div v-if="cityInput"
                            class="absolute w-full bg-white dark:bg-gray-600 border dark:border-cyan-900 scrollbar  rounded-b-md  max-h-60 overflow-auto">
                            <div v-if="showDropdown" v-for="city in filterCities()" :key="city.name"
                                @click="selectCity(city.name)"
                                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                {{ city.name }}
                            </div>
                        </div>
                    </div>



                    <Calendar v-model="DateInput" v-on:date-select="handleDateSelection" dateFormat="yy-mm-dd"
                        class="md:w-2/5 w-full pl-3   py-3 border  border-gray-300 rounded-md active:outline-none focus:outline-none dark:border-gray-900 dark:bg-gray-700 dark:text-gray-900"
                        :show-icon="true" placeholder="Date" />


                </div>

                <div class="flex justify-between flex-wrap md:flex-nowrap gap-2 md:gap-0">
                    <button @click="getUserLocation" type="button"
                        class="z-[10] text-white bg-blue-700 hover:bg-blue-800 dark:bg-cyan-600 dark:hover:bg-cyan-700  focus:outline-none active:outline-none  rounded-xl font-semibold text-sm px-5 py-2.5 text-center me-2   inline-flex items-center">
                        <svg v-if="usingCurrentLocation" aria-hidden="true" role="status"
                            class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor" />
                        </svg>
                        {{ usingCurrentLocation ? 'Using your location ' : 'Use my current location' }}
                    </button>

                    <div class="flex gap-2 items-center">
                        <button @click="handleChange('All')" class="px-4 py-2  rounded-full border-2 "
                            :class="{ 'border-cyan-600 dark:border-cyan-400 ': showingSearchResults.time == 'All' }">All</button>
                        <button @click="handleChange('Morning')"
                            :class="{ 'border-cyan-600': showingSearchResults.time == 'Morning' }"
                            class="px-4 py-2  rounded-full border-2">Morning</button>
                        <button @click="handleChange('Afternoon')"
                            :class="{ 'border-cyan-600': showingSearchResults.time == 'Afternoon' }"
                            class="px-4 py-2  rounded-full border-2">Afternoon</button>

                    </div>

                </div>

            </div>


            <div class="py-4 px-2">
                <!-- <h1 class="text-lg font-bold py-1"> {{ dentistries.length }} results</h1> -->
                <div class="flex flex-col listofitems space-y-2 p-2 ">
                    <template v-if="isPending">
                        <DentistryCardSkeleton v-for="n in 5" :key="n" />
                    </template>
                    <template v-else-if="isError">
                        <div class="text-center text-md text-gray-500 max-w-[18rem] mx-auto line-clamp-3">
                            {{ error?.message }}
                        </div>
                    </template>
                    <template v-else>
                        <DentistryListItem :far-from-user="farFromUser(dentistry)" v-for="dentistry in data"
                            :key="dentistry._id" :dentistry="dentistry" @time-selected="handleTimeSelection" />
                    </template>
                </div>
            </div>
            <!-- <Paginator :rows="2" :totalRecords="dentistries.length" class="p-4   " /> -->
        </div>

        <div class="md:w-[65%] z-0  ">
            <DentistryMap :users-location="usersLocation" :using-current-location="usingCurrentLocation" :dentistries="data"
                :selectedCityCoordinates="selectedCityCoordinates" />
        </div>

    </div>

    <!-- Confirmation Bar -->
    <div v-if="showingConfirmationBar"
        class="fixed inset-x-0 bottom-0 md:flex-nowrap md:gap-0 gap-2 flex-wrap z-50 bg-white dark:bg-gray-900  shadow-black px-10 p-5 flex justify-between items-center shadow-2xl">
        <div class="flex items-center">
            <!-- Appointment Details -->
            <div class="flex items-center gap-4">
                <span class="text-md font-bold">
                    Appointment:
                    <span class="font-normal">
                        {{ bookingStore.bookingData?.dentistry.name }}
                    </span>
                </span>
                <!-- Divider -->
                <span class="border-l border-gray-300 h-6"></span>
                <span class="text-md text-gray-600 dark:text-gray-300">
                    {{ bookingStore.bookingData?.data.date }}
                </span>
                <!-- Divider -->
                <span class="border-l border-gray-300 h-6"></span>
                <span class="text-md text-gray-600 dark:text-gray-300">
                    {{ bookingStore.bookingData?.data.startTime }} - {{ bookingStore.bookingData?.data.endTime }}
                </span>
            </div>
        </div>

        <div class=" items-end md:justify-end flex gap-2">
            <!-- Cancel Button -->
            <button @click="showingConfirmationBar = false"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl">
                Cancel
            </button>
            <!-- Continue Button -->
            <button @click="handleConfirmationButton"
                class="bg-blue-500 dark:bg-green-600 w-[20rem] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl">
                Continue
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { swedishCities } from '../utils/swedishCities';
import { provide, ref, watch } from 'vue';
import Calendar from 'primevue/calendar';
import DentistryMap from '../components/DentistryMap.vue';
import 'primevue/resources/themes/lara-light-teal/theme.css';
import DentistryListItem from '../components/DentistryListItem.vue';
import 'leaflet/dist/leaflet.css';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { useUserStore } from '../stateStores/userStore';
import router from '../router';
import { useBookingStore } from '../stateStores/bookingStore';
import axios from 'axios';
import { DENTIST_API } from '../utils/apiConfig';
import DentistryCardSkeleton from '../components/DentistryCardSkeleton.vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
// city input is one of the sweedish cities in the array
const cityInput = ref('');
const DateInput = ref(null);
const showDropdown = ref(false);
const bookingStore = useBookingStore();
const showingConfirmationBar = ref(false);

const showingSearchResults = ref({ time: 'All' } as { time: SearchInput });
const dentistries = ref([] as Dentistry[]);
const route = useRoute();

const selectedCityCoordinates = ref({} as location);


const usersLocation = ref({} as location);
const usingCurrentLocation = ref(false);

const userStore = useUserStore();

provide('userStore', userStore);

const city = ref(route.query.city as string);


const { isPending, isError, data, error } = useQuery<Dentistry[]>({
    queryKey: ['clinics', city],
    queryFn: getClinics,
})

watch(() => route.query.city, (cityName) => {
    if (cityName) {
        const city = swedishCities.find(c => c.name === cityName);
        if (city) {
            selectedCityCoordinates.value = city.coordinates;
            console.log("City selected:", cityName, "with coordinates" + city.coordinates.lat); // Debugging log
        } else {
            // Handle the case where the city is not found
            console.log("City not found:", cityName); // Debugging log
        }
    }
}, { immediate: true });


watch(() => route.query.city, () => {
    // set the city input to the city in the route
    console.log(route.query.city);
    city.value = route.query.city as string;
}
);



async function getClinics() {
    // get city from param
    let city = route.query.city;

    if (!city) {
        city = '';
    }

    try {
        const response = await axios.get(`${DENTIST_API}/clinics/city?city=${city}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;

    } catch (error) {
        console.error('Error fetching clinics:', error);
    }
}



function handleChange(newValue: SearchInput) {
    showingSearchResults.value.time = newValue;
    console.log(showingSearchResults.value.time);
}

type SearchInput = 'All' | 'Morning' | 'Afternoon';

// filtered cities is an array of cities that match the input
function filterCities() {
    if (!cityInput.value) {
        return [];
    }

    return swedishCities.filter(city =>
        city.name.toLowerCase().includes(cityInput.value.toLowerCase())
    );
}


const selectCity = (cityName: string) => {
    const city = swedishCities.find(c => c.name === cityName);
    if (city) {
        selectedCityCoordinates.value = city.coordinates;
    }

    router.push({ query: { city: cityName } });

    /// close the dropdown
    showDropdown.value = false;
};

type location = {
    lat: number;
    lng: number;
};



const getUserLocation = async () => {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        usersLocation.value = {
            lat: (position as GeolocationPosition).coords.latitude,
            lng: (position as GeolocationPosition).coords.longitude
        };

        // find the users city
        const usersCity = findUsersCity(usersLocation.value.lat, usersLocation.value.lng);
        // set the city input to the users city
        cityInput.value = usersCity.name;

        // set the route
        router.push({ query: { city: usersCity.name } });

        usingCurrentLocation.value = true;
    } catch (error) {
        console.error("Error fetching user location:", error);
        // Handle error or fallback here
    }
};


// function to find the users city based on their location
function findUsersCity(lat: number, lng: number) {
    let closestCity = swedishCities[0];
    let closestDistance = Math.sqrt(Math.pow(lat - closestCity.coordinates.lat, 2) + Math.pow(lng - closestCity.coordinates.lng, 2));

    for (let i = 1; i < swedishCities.length; i++) {
        const city = swedishCities[i];
        const distance = Math.sqrt(Math.pow(lat - city.coordinates.lat, 2) + Math.pow(lng - city.coordinates.lng, 2));
        if (distance < closestDistance) {
            closestCity = city;
            closestDistance = distance;
        }
    }


    return closestCity;
}

function farFromUser(dentistry: Dentistry) {
    const dentistryLat = dentistry.coordinates.lat;
    const dentistryLng = dentistry.coordinates.lng;
    const userLat = usersLocation.value.lat;
    const userLng = usersLocation.value.lng;

    const distance = Math.sqrt(Math.pow(dentistryLat - userLat, 2) + Math.pow(dentistryLng - userLng, 2));
    //return the distance in km
    return (distance * 100);
}



function handleTimeSelection(data: unknown) {
    bookingStore.setBookingData(data as Booking);


    showingConfirmationBar.value = true;
}

function handleConfirmationButton() {
    // push to confirmation and send the data
    showingConfirmationBar.value = false;
    router.push({ name: 'Confirmation' });
}






function handleDateSelection() {
    if (!DateInput.value) return;
    const date = DateInput.value ? new Date(DateInput.value).toLocaleDateString('sv-SE') : '';
    console.log(date);


    sortDentistriesByAvailableTimes(date);
}

// Function to sort by date
function sortDentistriesByAvailableTimes(date: string) {
    const sortedDentistries = dentistries.value;

    // sort the dentistries, the first one will have the most available times on the selected date
    sortedDentistries.sort((a, b) => {
        // get the number of available times for the first dentistry
        const aAvailableTimes = a.slots.filter((slot) => slot.date === date).length;
        // get the number of available times for the second dentistry
        const bAvailableTimes = b.slots.filter((slot) => slot.date === date).length;

        // return the difference between the two numbers
        return bAvailableTimes - aAvailableTimes;
    });


    return sortedDentistries;
}




</script>

<style>
/* primevue force diff colors */
.dark .p-calendar .p-inputtext {
    background-color: rgb(55 65 81);
    color: #E5E5E5;
    border-color: #ff0000;
}

.dark .p-icon {
    color: #ffffff;
}

.p-calendar:focus .p-inputtext:focus {
    border-color: transparent;
    border: none;
    outline: none;
    box-shadow: none !important;
    ;
}

.p-calendar:not(.p-calendar-disabled).p-focus>.p-inputtext {
    border-color: transparent;
    border: none;
    outline: none;

    box-shadow: none !important;
    ;
}
</style>
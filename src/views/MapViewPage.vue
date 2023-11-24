<template>
    <div class="md:flex flex-1 border-t  md:overflow-auto flex-row ">





        <div v-if="!DentistryInfoToggle" class="md:w-[40%] flex flex-col justify-between max-h-screen overflow-y-scroll">
            <div class="bg-white flex flex-col px-5 py-7 space-y-6">
                <h1 class="text-2xl font-bold">Make an appointment </h1>

                <div class="flex w-full items-center gap-10 ">
                    <div class="relative flex-grow mr-3 md:w-3/5">
                        <input type="text" v-model="adressInput" placeholder="Search by city, postal code or street"
                            class="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                        <MagnifyingGlassIcon
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-6" />
                    </div>


                    <Calendar v-model="DateInput"
                        class="md:w-2/5 pl-3  py-3 border border-gray-300 rounded-md focus:outline-none" :showIcon="true"
                        placeholder="Date" />


                </div>

                <div class="flex justify-between">
                    <button @click="getUserLocation" type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none active:outline-none  rounded-xl font-semibold text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600  inline-flex items-center">
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
                        <button @click="handleChange('All')" class="px-4 py-2 border rounded-full "
                            :class="{ 'border-cyan-600': showingSearchResults.time == 'All' }">All</button>
                        <button @click="handleChange('Morning')"
                            :class="{ 'border-cyan-600': showingSearchResults.time == 'Morning' }"
                            class="px-4 py-2 border rounded-full">Morning</button>
                        <button @click="handleChange('Afternoon')"
                            :class="{ 'border-cyan-600': showingSearchResults.time == 'Afternoon' }"
                            class="px-4 py-2 border rounded-full">Afternoon</button>

                    </div>

                </div>

            </div>


            <div class="py-4 px-2">
                <h1 class="text-lg font-bold py-1"> {{ dentistries.length }} results</h1>
                <div class="flex flex-col listofitems space-y-2 py-2 ">
                    <DentistryListItem v-for="dentistry in dentistries" :dentistry="dentistry" @viewOnMap="focusOnMap" />
                </div>
            </div>
            <!-- <Paginator :rows="2" :totalRecords="dentistries.length" class="p-4   " /> -->
        </div>
        <div v-else class="md:w-1/3 p-4 flex flex-col">
            <div class="flex flex-col justify-between">
                <div class="flex flex-col space-y-2">
                    <div class="flex flex-row justify-between">
                        <h1 class="text-lg font-bold py-1">{{ toggledDentistry.name }}</h1>
                        <button @click="DentistryInfoToggle = false" class="text-lg font-bold py-1">X</button>
                    </div>

                </div>
            </div>

        </div>
        <div class="md:w-[65%] ">
            <l-map class="h-full" ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
                <l-tile-layer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    layer-type="base" name="Stadia Maps Basemap"></l-tile-layer>
                <!-- <l-marker :lat-lng="campusMarker">
                    <l-popup :content="`<h1>Chalmers University of Technology</h1>`" :lat-lng="campusMarker">
                    </l-popup>
                </l-marker> -->
                <l-marker v-if="usingCurrentLocation" :lat-lng="usersLocation">
                    <l-icon icon-url="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
                        :icon-size="[40, 40]" :icon-anchor="[20, 40]"></l-icon>
                    <l-popup content="You are here" :lat-lng="usersLocation" opened>
                    </l-popup>
                </l-marker>

                <l-marker @click="handleMarkerClick(dentistry)" v-for="dentistry in dentistries" :key="dentistry.id"
                    :lat-lng="dentistry.coordinates">
                    <l-popup :content="`<h1>${dentistry.name}</h1>`" :lat-lng="dentistry.coordinates">
                    </l-popup>
                </l-marker>
            </l-map>
        </div>

    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
// import mapViewSearchBar from '../components/mapViewSearchBar.vue';
import Calendar from 'primevue/calendar';

import Paginator from 'primevue/paginator';

import 'primevue/resources/themes/lara-light-teal/theme.css';
import DentistryListItem from '../components/DentistryListItem.vue';
import dentistryData from "../mockupdata";
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
const adressInput = ref(null);
const DateInput = ref(null);
const usingCurrentLocation = ref(false);
const showingSearchResults = ref({ time: 'All' } as { time: SearchInput });

function handleChange(newValue: SearchInput) {
    showingSearchResults.value.time = newValue;
    console.log(showingSearchResults.value.time);
}


type SearchInput = 'All' | 'Morning' | 'Afternoon';


const usersLocation = ref({ lat: 0, lng: 0 });

async function getUserLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        usersLocation.value.lat = position.coords.latitude;
        usersLocation.value.lng = position.coords.longitude;
        usingCurrentLocation.value = true;

        // Update the center and zoom
        center.value = [usersLocation.value.lat, usersLocation.value.lng];
        // wait 0.5 seconds and then zoom
        await new Promise(r => setTimeout(r, 500));
        zoom.value = 16;


    });
}




const dentistries = ref(dentistryData);


const center = ref([57.7089, 11.9746]); // Coordinates for Gothenburg
const zoom = ref(13);
console.log(zoom.value);


const DentistryInfoToggle = ref(false);
const toggledDentistry = ref({} as Dentistry);

// Access the map instance
const map = ref(null);


// watch(center, (newCenter) => {
//     // console.log(newCenter);
//     // find all dentistries with long lat within the bounds
//     const lat = newCenter.lat;
//     const lng = newCenter.lng;

//     dentistries.value.filter((dentistry) => {
//         const dentistryLat = dentistry.coordinates.lat;
//         const dentistryLng = dentistry.coordinates.lng;
//         if (dentistryLat > lat - 0.1 && dentistryLat < lat + 0.1 && dentistryLng > lng - 0.1 && dentistryLng < lng + 0.1) {
//             console.log(dentistry);

//             // if the dentistries are already in the list, do nothing else refetch
//             if (dentistries.value.includes(dentistry)) {
//                 console.log("already in list");
//             } else {
//                 // replace the entire list with the new list
//                 console.log(" replacing list with " + dentistry);
//                 dentistries.value = dentistries.value.concat(dentistry);
//             }
//         }
//     });
// });

function focusOnMap(dentistry: Dentistry) {
    center.value = [dentistry.coordinates.lat, dentistry.coordinates.lng];
    zoom.value = 16;
}


// watch the breakpoint long lats and console log the bounds



function handleMarkerClick(dentistry: Dentistry) {
    DentistryInfoToggle.value = true;
    toggledDentistry.value = dentistry;
}

</script>




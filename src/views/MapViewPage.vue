<template>
    <div class="md:flex flex-1   md:overflow-auto flex-row ">
        <div v-if="!DentistryInfoToggle" class=" md:w-1/3  p-4 flex flex-col justify-between">
            <div class="py-4 px-2">
                <h1 class="text-lg font-bold py-1"> {{ dentistries.length }} results</h1>
                <div class="flex flex-col listofitems space-y-2 py-2 ">
                    <DentistryListItem v-for="dentistry in dentistries" :dentistry="dentistry" @viewOnMap="focusOnMap" />
                </div>
            </div>
            <Paginator :rows="2" :totalRecords="dentistries.length" class="p-4   " />
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
        <div class=" md:w-2/3 p-4 rounded-xl text-center items-center text-5xl text-white fontb-bold justify-center
                            flex">
            <l-map class="" ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
                <l-tile-layer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    layer-type="base" name="Stadia Maps Basemap"></l-tile-layer>
                <!-- <l-marker :lat-lng="campusMarker">
                    <l-popup :content="`<h1>Chalmers University of Technology</h1>`" :lat-lng="campusMarker">
                    </l-popup>
                </l-marker> -->

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
import Paginator from 'primevue/paginator';
import DentistryListItem from '../components/DentistryListItem.vue';
import dentistryData from "../mockupdata";
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

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



<style lang="">
    
</style>
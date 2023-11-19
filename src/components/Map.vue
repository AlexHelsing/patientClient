<!-- <template lang="">
     <l-map class="" ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
                <l-tile-layer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    layer-type="base" name="Stadia Maps Basemap"></l-tile-layer>
                <l-marker :lat-lng="campusMarker">
                    <l-popup :content="`<h1>Chalmers University of Technology</h1>`" :lat-lng="campusMarker">
                    </l-popup>
                </l-marker>

                <l-marker v-for="dentistry in dentistries" :key="dentistry.id" :lat-lng="dentistry.coordinates">
                    <l-popup :content="`<h1>${dentistry.name}</h1>`" :lat-lng="dentistry.coordinates">
                    </l-popup>
                </l-marker>
            </l-map>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

import dentistryData from "../mockupdata";
const dentistries = ref(dentistryData);


const center = ref([57.7089, 11.9746]); // Coordinates for Gothenburg
const zoom = ref(13);
const campusMarker = ref([57.7066, 11.9367]);


</script>
<style lang="">
    
</style> -->
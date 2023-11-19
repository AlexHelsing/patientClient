<template lang="">
    <div>
        {{dentistry.name}}
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import dentistryData from "../mockupdata";
import { useRoute } from "vue-router";

const dentistries = ref(dentistryData);

const route = useRoute();
const dentistryId = route.params.id;

const dentistry = dentistries.value.find((dentistry) => dentistry.id === dentistryId);

if (!dentistry) {
    throw new Error(`Dentistry with id ${dentistryId} not found`);
}

</script>


<style lang="">
    
</style>
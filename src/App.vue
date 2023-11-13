<script setup lang="ts">
import { computed } from 'vue';
import NavBar from './components/NavBar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const showNavBar = computed(() => route.path !== '/auth');
</script>
<template>
  <div class="min-h-screen text-gray-900 bg-blue-200">
    <NavBar v-if="showNavBar" />

    <router-view />
  </div>
</template>

<style scoped></style>

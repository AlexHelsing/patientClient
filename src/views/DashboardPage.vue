<template>
    <div>
        {{ userStore.getUser?.firstname }}
    </div>
</template>
  
<script setup lang="ts">
import { useUserStore } from '../stateStores/userStore';
// Use a computed ref to ensure reactivity

const userStore = useUserStore();

console.log(userStore.getUser); // 



// run userStore init function on mount
</script>
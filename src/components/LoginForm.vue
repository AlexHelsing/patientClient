<script setup lang="ts">
import { ref } from 'vue'

const handleLogin = () => {
    alert('logging in with ' + email.value + ' and ' + password.value);
}

const email = ref('');
const password = ref('');

// export the component

</script>
<template>
    <form @submit="handleLogin" class="space-y-6">
        <div class="relative">
            <label for="Email address" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input v-model="email" id="Email" type="Email"
                    class="form-input block w-full py-4 pl-4 pr-10 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Enter your Email">
                <div class="absolute inset-y-0 cursor-default bg-cyan-500 px-4 right-0 flex justify-center items-center ">
                    <img src="../assets/envelope.svg" class="h-6 w-6 " alt="">
                </div>
            </div>
        </div>
        <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input v-model="password" id="password" type="password"
                    class="form-input block w-full py-4 pl-4 pr-10 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Enter your password">
                <div class="absolute inset-y-0 cursor-default bg-cyan-500 px-4 right-0 flex justify-center items-center ">
                    <img src="../assets/lock.svg" class="h-6 w-6 " alt="">
                </div>
            </div>
        </div>
        <div class="flex items-center justify-between">
            <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
        </div>
        <button type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">Login
            now</button>
    </form>
</template>

<style lang="">
    
</style>
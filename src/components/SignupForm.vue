<script setup lang="ts">
import { ref } from 'vue'

const handleSignup = () => {
    alert('Creating account with  ' + email.value + ' and ' + password.value);
}

const email = ref('');
const password = ref('');

// export the component

</script>
<template>
    <form @submit="handleSignup" class="space-y-6">
        <div class="relative">
            <label for="Email address" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input v-model="email" id="Email" type="Email"
                    class="form-input block w-full py-4 pl-4 pr-10 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Enter your Email">

            </div>
        </div>
        <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input v-model="password" id="password" type="password"
                    class="form-input block w-full py-4 pl-4 pr-10 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Enter your password">

            </div>
        </div>

        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full name</label>
            <div class="mt-1 flex justify-between gap-5">
                <input id="fname" name="fname" type="text"
                    class="form-input block w-full py-4 px-4 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Firstname">

                <input id="lname" name="lname" type="text"
                    class="form-input block w-full py-4 px-4 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Lastname">
            </div>
        </div>

        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Phone number</label>
            <div class="mt-1 flex justify-between gap-5">
                <input id="name" name="name" type="text"
                    class="form-input block w-full py-4 px-4 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Enter your phone number">
            </div>
        </div>

        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Date of birth</label>
            <div class="mt-1 flex justify-between gap-5">
                <input id="name" name="name" type="text"
                    class="form-input block w-full py-4 px-4 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Year">

                <input id="name" name="name" type="text"
                    class="form-input block w-full py-4 px-4 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Month">

                <input id="name" name="name" type="text"
                    class="form-input block w-full py-4 px-4 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Day">
            </div>
        </div>

        <button type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">Create
            account</button>
    </form>
</template>

<style lang="">
    
</style>
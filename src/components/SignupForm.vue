<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
import API from '../utils/apiConfig';

const router = useRouter();

async function handleSignup(e: Event) {
    e.preventDefault();
    try {
        const response = await axios.post(`${API}/patients`, {
            email: email.value,
            password: password.value,
            firstname: fname.value,
            lastname: lname.value,
            phone_number: Number(phone.value),
            DOB: `${DOB.value.year}-${DOB.value.month}-${DOB.value.day}`
        });

        const data = response.data;

        const token = data.token;

        // set session token
        document.cookie = `token=${token}`;

        console.log(data);

        //  redirect to dashboard
        router.push('/dashboard');

    } catch (error) {
        console.error(error);
    }
}

const email = ref('');
const password = ref('');
const fname = ref('');
const lname = ref('');
const phone = ref('');
const DOB = ref({
    year: '',
    month: '',
    day: ''
});

</script>
<template>
    <form @submit="handleSignup" class="space-y-6">
        <div class="relative">
            <label for="Email address" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input v-model="email" id="Email" type="Email"
                    class="form-input block w-full py-2 md:py-4 pl-4 pr-10 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Enter your Email">

            </div>
        </div>
        <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input v-model="password" id="password" type="password"
                    class="form-input block w-full py-2 md:py-4 pl-4 pr-10 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Enter your password">

            </div>
        </div>

        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full name</label>
            <div class="mt-1 flex justify-between gap-5">
                <input v-model="fname" id="fname" name="fname" type="text"
                    class="form-input block w-full py-2 md:py-4 px-4 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Firstname">

                <input id="lname" name="lname" type="text" v-model="lname"
                    class="form-input block w-full py-2 md:py-4 px-4 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Lastname">
            </div>
        </div>

        <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone number</label>
            <div class="mt-1 flex justify-between gap-5">
                <input id="phone" name="name" type="text" v-model="phone"
                    class="form-input block w-full py-2 md:py-4 px-4 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Enter your phone number">
            </div>
        </div>

        <div>
            <label for="DOB" class="block text-sm font-medium text-gray-700">Date of birth</label>
            <div class="mt-1 flex justify-between gap-5">
                <input id="year" name="name" type="text" v-model="DOB.year"
                    class="form-input block w-full py-2 md:py-4 px-4 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Year">

                <input id="month" name="name" type="text" v-model="DOB.month"
                    class="form-input block w-full py-2 md:py-4 px-4 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Month">

                <input id="day" name="name" type="text" v-model="DOB.day"
                    class="form-input block w-full py-2 md:py-4 px-4 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
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
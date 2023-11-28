<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
import API from '../utils/apiConfig';
import { setCookie } from '../utils/cookieHandler';
import { useUserStore } from '../stateStores/userStore';

const router = useRouter();

function handleSignup(e: Event) {
    e.preventDefault();

    if (!email.value || !password.value || !fname.value || !lname.value || !phone.value || !DOB.value.year || !DOB.value.month || !DOB.value.day) {
        alert('Please fill in all fields');
        return;
    }

    axios.post(`${API}/patients`, {
        email: email.value,
        password: password.value,
        firstname: fname.value,
        lastname: lname.value,
        phone_number: Number(phone.value),
        DOB: `${DOB.value.year}-${DOB.value.month}-${DOB.value.day}`
    })
        .then(response => {
            const data = response.data;
            const token = data.token;

            // set session token
            setCookie('token', token);

            // update user state
            userStore.setUser({
                email: data.patient.email,
                firstname: data.patient.firstname,
                lastname: data.patient.lastname,
                phone_number: data.patient.phone_number,
                DOB: data.patient.DOB,
                id: data.patient.id,
            });

            // redirect to dashboard
            router.push('/dashboard');
        })
        .catch(error => {
            console.error(error.response.data.message);
            alert(error.response && error.response.data.message ? error.response.data.message : 'An error occurred during signup.');
        });
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

const userStore = useUserStore();

</script>
<template>
    <form @submit="handleSignup" class="space-y-4 md:space-y-6 p-4 md:p-0">
        <div>
            <label for="Email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input autocomplete="email" v-model="email" id="Email" type="email"
                class="mt-1 block w-full py-2 px-3 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                placeholder="Enter your Email">
        </div>

        <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input autocomplete="new-password" v-model="password" id="password" type="password"
                class="mt-1 block w-full py-2 px-3 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                placeholder="Enter your password">
        </div>

        <div>
            <label for="fname" class="block text-sm font-medium text-gray-700">Full name</label>
            <div class="mt-1 flex flex-col md:flex-row gap-3">
                <input autocomplete="nickname" v-model="fname" id="fname" name="fname" type="text"
                    class="form-input block w-full py-2 px-3 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Firstname">
                <input autocomplete="cc-additional-name" id="lname" name="lname" type="text" v-model="lname"
                    class="form-input block w-full py-2 px-3 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Lastname">
            </div>
        </div>

        <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone number</label>
            <input autocomplete="tel-local" id="phone" name="phone" type="text" v-model="phone"
                class="mt-1 block w-full py-2 px-3 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                placeholder="Enter your phone number">
        </div>

        <div>
            <label for="DOB" class="block text-sm font-medium text-gray-700">Date of birth</label>
            <div class="mt-1 flex flex-col md:flex-row gap-3">
                <input autocomplete="bday-year" id="year" name="year" type="text" v-model="DOB.year"
                    class="form-input block w-full py-2 px-3 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Year">
                <input autocomplete="bday-month" id="month" name="month" type="text" v-model="DOB.month"
                    class="form-input block w-full py-2 px-3 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Month">
                <input autocomplete="bday-day" id="day" name="day" type="text" v-model="DOB.day"
                    class="form-input block w-full py-2 px-3 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                    placeholder="Day">
            </div>
        </div>

        <button type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
            Create account
        </button>
    </form>
</template>

<style lang="">
    
</style>
<script setup lang="ts">

</script>


<template>
    <div class="min-h-screen flex text-black bg-gray-200">
        <div
            class="bg-gray-50 flex-[3] flex flex-col px-6 space-y-7 shadow-xl  border justify-center rounded-tr-xl rounded-br-xl">
            <span class="flex items-center gap-2 justify-center">
                <img class="h-12 w-12 " src="../assets/tooth.svg" alt="tooth logo">
                <h1 class="text-4xl bg-blend-color-dodge font-bold">App Name</h1>
            </span>
            <p class="items-center flex justify-center font-semibold">Log into your account</p>
            <div class="space-y-6">
                <div class="relative">
                    <label for="Email address" class="block text-sm font-medium text-gray-700">Email</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                        <input id="Email" type="Email"
                            class="form-input block w-full py-4 pl-4 pr-10 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                            placeholder="Enter your Email">
                        <div
                            class="absolute inset-y-0 cursor-default bg-cyan-300 px-4 right-0 flex justify-center items-center ">
                            <img src="../assets/envelope.svg" class="h-6 w-6 " alt="">
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                        <input id="password" type="password"
                            class="form-input block w-full py-4 pl-4 pr-10 bg-gray-200 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                            placeholder="Enter your password">
                        <div
                            class="absolute inset-y-0 cursor-default bg-cyan-300 px-4 right-0 flex justify-center items-center ">
                            <img src="../assets/lock.svg" class="h-6 w-6 " alt="">
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                </div>
                <button
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login
                    now</button>
                <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-gray-50 text-gray-500">OR</span>
                    </div>
                </div>
                <button
                    class="w-full text-gray-700 hover:text-white flex justify-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium  border-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Signup
                    now</button>

            </div>
        </div>

        <div class="md:flex flex-[7] p-8 justify-center items-center hidden">

            <img class="object-contain h-180 w-460 " src="../assets/loginbg.png" alt="">
        </div>
    </div>
</template>

<style scoped>
.or-divider::before,
.or-divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #d1d5db;
}

.or-divider span {
    margin: 0 1rem;

}
</style>

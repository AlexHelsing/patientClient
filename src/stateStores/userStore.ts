import { defineStore } from 'pinia';
import axios from 'axios';
import API from '../utils/apiConfig';
import { deleteCookie, getCookie } from '../utils/cookieHandler';
import router from '../router'; // Import your router

export const useUserStore = defineStore('user', {
  // The state must be a function to return a fresh object
  state: () => ({
    user: null as User | null,
  }),

  // Getters are similar to computed properties and are cached
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!state.user,
  },

  // Actions are functions that can cause side effects and can be asynchronous
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },

    logout() {
      // Delete the token cookie
      deleteCookie('token');
      // Reset the state
      this.user = null;
      // Redirect to auth page
      router.push('/auth');
    },

    // Init function to check if user is null but has a token => get user from DB
    async init() {
      if (!this.user) {
        const token = getCookie('token');
        if (token) {
          await this.getCurrentUserFromDB();
        }
      }
    },

    async getCurrentUserFromDB() {
      try {
        const token = getCookie('token');
        const response = await axios.get(`${API}/patients/current-user`, {
          headers: {
            'x-access-token': token,
          },
        });
        const user = response.data as User;
        this.setUser(user);
        console.log(this.user);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

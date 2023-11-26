import { defineStore } from 'pinia';

interface Booking {
  data: {
    id: string;
    start: string;
    end: string;
    date: string;
  };
  dentistry: Dentistry;
}

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookingData: null as Booking | null,
  }),
  actions: {
    setBookingData(data: any) {
      this.bookingData = data;
    },
    clearBookingData() {
      this.bookingData = null;
    },
  },
});

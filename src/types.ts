interface Dentistry {
  name: string;
  _id: string;
  rating: number;
  address?: string;
  phone?: string;
  photo?: string;
  type: string;
  slots: TimeSlot[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface Slot {
  id: string;
  patientId: string;
  dentistId: string;
  start: Date;
  end: Date;
  date: Date;
}

interface Appointment {
  _id: string;
  patientId: string;
  dentistId: string;
  startTime: string;
  endTime: string;
  date: Date;
  isBooked: boolean;
}

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  phone_number: Number;
  email: string;
  DOB?: Date;
}

type TimeSlot = {
  _id: string;
  dentistId: string;
  startTime: string;
  endTime: string;
  date: string;
  isBooked: boolean;
};

interface Booking {
  data: TimeSlot;
  dentistry: Dentistry;
}

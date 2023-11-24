interface Dentistry {
  name: string;
  id: string;
  rating: number;
  address?: string;
  phone?: string;
  image?: string;
  type: string;
  slots: Slot[];
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

interface User {
  id: string;
  firstname: string;
  lastname: string;
  phone_number: Number;
  email: string;
  DOB: Date;
}

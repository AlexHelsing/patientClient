interface Dentistry {
  name: string;
  id: string;
  rating: number;
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface User {
  id: string;
  firstname: string;
  lastname: string;
  phone_number: Number;
  email: string;
  DOB: Date;
}

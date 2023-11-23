const dentistries = [
  {
    name: 'Dentistry 1',
    id: '1',
    rating: 3,
    slots: [
      {
        id: '1',
        patientId: '1',
        dentistId: '1',
        start: new Date('2020-01-01T10:00:00'),
        end: new Date('2020-01-01T11:00:00'),
        date: new Date('2023-11-23'),
      },
      {
        id: '2',
        patientId: '2',
        dentistId: '1',
        start: new Date('2020-01-01T11:00:00'),
        end: new Date('2020-01-01T12:00:00'),
        date: new Date('2020-11-24'),
      },
      {
        id: '3',
        patientId: '3',
        dentistId: '1',
        start: new Date('2020-01-01T13:00:00'),
        end: new Date('2020-01-01T14:00:00'),
        date: new Date('2020-11-25'),
      },
      {
        id: '4',
        patientId: '4',
        dentistId: '1',
        start: new Date('2020-01-01T14:00:00'),
        end: new Date('2020-01-01T15:00:00'),
        date: new Date('2020-01-01'),
      },
      {
        id: '5',
        patientId: '5',
        dentistId: '1',
        start: new Date('2020-01-01T15:00:00'),
        end: new Date('2020-01-01T16:00:00'),
        date: new Date('2020-01-01'),
      },
      {
        id: '6',
        patientId: '6',
        dentistId: '1',
        start: new Date('2020-01-01T16:00:00'),
        end: new Date('2020-01-01T17:00:00'),
        date: new Date('2020-01-01'),
      },
    ],
    type: 'tooth',
    coordinates: {
      lat: 57.70887,
      lng: 11.97456,
    },
  },
  {
    name: 'Dentistry 2',
    id: '2',
    rating: 4.5,
    slots: [],
    type: 'tooth',
    coordinates: {
      lat: 57.70777,
      lng: 11.97456,
    },
  },
  {
    name: 'Dentistry 3',
    id: '3',
    rating: 4.5,
    slots: [],
    type: 'tooth',
    coordinates: {
      lat: 57.50777,
      lng: 11.97456,
    },
  },
  {
    name: 'Dentistry 4',
    id: '4',
    rating: 4.5,
    slots: [],
    type: 'tooth',
    coordinates: {
      lat: 57.49777,
      lng: 11.97456,
    },
  },
  {
    name: 'Dentistry 5',
    id: '5',
    rating: 4.5,
    slots: [],
    type: 'tooth',
    coordinates: {
      lat: 57.48777,
      lng: 11.97456,
    },
  },
];

export default dentistries;

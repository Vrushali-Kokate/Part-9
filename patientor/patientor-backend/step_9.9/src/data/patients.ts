import { Gender, Patient } from '../types';

const patients: Patient[] = [
  {
    id: 'd2775b85-f3f5-49a5-88e7-60d09f7df3c9',
    name: 'John Doe',
    occupation: 'Software engineer',
    gender: Gender.Male
  },
  {
    id: 'f0a02e59-36c1-4df0-afc3-3e761d3cdb32',
    name: 'Jane Smith',
    occupation: 'Teacher',
    gender: Gender.Female
  }
];

export default patients;

import { Patient, Gender } from '../types';

const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    ssn: "123-45-6789",
    occupation: "Engineer",
    gender: Gender.Male,
    dateOfBirth: "1980-01-01",
    entries: []
  },
  {
    id: "2",
    name: "Jane Smith",
    ssn: "987-65-4321",
    occupation: "Teacher",
    gender: Gender.Female,
    dateOfBirth: "1975-05-20",
    entries: []
  }
];

export default patients;

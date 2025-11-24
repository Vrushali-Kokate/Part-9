// src/data/patients.ts
import { Patient, Gender } from '../types';

const patients: Patient[] = [
  {
    id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
    name: 'John McClane',
    dateOfBirth: '1986-01-02',
    ssn: '123-45-6789',
    gender: Gender.Male,
    occupation: 'New York City cop',
    entries: [
      {
        id: 'entry-1',
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description: "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.'
        }
      },
      {
        id: 'entry-2',
        date: '2019-08-05',
        type: 'OccupationalHealthcare',
        specialist: 'MD House',
        employerName: 'HyPD',
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        description: "Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning.",
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28'
        }
      },
      {
        id: 'entry-3',
        date: '2020-10-20',
        type: 'HealthCheck',
        specialist: 'Dr. Who',
        description: 'Yearly routine check-up, all good.',
        healthCheckRating: 0
      }
    ]
  },

  {
    id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
    name: 'Jane Doe',
    dateOfBirth: '1979-05-12',
    ssn: '987-65-4321',
    gender: Gender.Female,
    occupation: 'Astronaut',
    entries: [
      {
        id: 'entry-4',
        date: '2018-03-12',
        type: 'Hospital',
        specialist: 'Dr Strange',
        description: 'Minor fracture; cast applied.',
        discharge: {
          date: '2018-03-20',
          criteria: 'X-ray shows healing'
        }
      }
    ]
  }
];

export default patients;

import { Cohort, Student, Staff } from './entities';

export default {
  entities: [
    Cohort,
    Student,
    Staff
  ],
  dbName: 'eduction',
  type: 'postgresql' as "postgresql" | "mongo" | "mysql" | "mariadb" | "sqlite" | "better-sqlite",
};
import { Cohort, Student, Staff } from './entities';

export default {
  entities: [
    Cohort,
    Student,
    Staff
  ],
  dbName: 'education',
  host: 'localhost',
  port: 3307,
  username: 'test',
  password: 'student',
  type: 'mysql' as "postgresql" | "mongo" | "mysql" | "mariadb" | "sqlite" | "better-sqlite",
};
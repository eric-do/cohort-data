import { faker } from '@faker-js/faker';

interface ITestStudent {
  github?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export const generateStudent = (): ITestStudent => ({
  github: faker.internet.userName(),
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
});
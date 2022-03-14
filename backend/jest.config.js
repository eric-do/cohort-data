/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/.jest/setup.ts"],
  moduleNameMapper: {
    '@lib/(.*)': '<rootDir>/server/lib/$1'
  }
};
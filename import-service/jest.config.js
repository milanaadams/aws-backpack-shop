/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    'node_modules'
  ],
  moduleNameMapper: {
    '^@functions/(.*)$': ["<rootDir>/src/functions/$1"],
    '^@libs/(.*)$': ["<rootDir>/src/libs/$1"],
    '^@services/(.*)$': ["<rootDir>/src/services/$1"],
    '^@mocks/(.*)$': ["<rootDir>/src/mocks/$1"],
    '^@models/(.*)$': ["<rootDir>/src/models/$1"],
  }
};

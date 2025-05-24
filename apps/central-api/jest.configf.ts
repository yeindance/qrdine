// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  globalSetup: '<rootDir>/test/global-setup.ts',

  moduleNameMapper: {
    '^@db/(.*)$': '<rootDir>/src/db/$1',
    '^@graphql/(.*)$': '<rootDir>/src/graphql/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json'
    }
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1',
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  }
};
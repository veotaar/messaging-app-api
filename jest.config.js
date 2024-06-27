/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  // transform: {
  //   'node_modules/nanoid/.+\\.(j|t)sx?$': 'ts-jest',
  // },
  // transformIgnorePatterns: ['node_modules/(?!nanoid/.*)'],
  // setupFiles: ['./src/setupTests.js'],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
};

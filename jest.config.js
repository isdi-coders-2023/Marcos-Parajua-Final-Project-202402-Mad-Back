/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
const config = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,
  // Stop running tests after `n` failures
  // bail: 0,
  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "C:\\Users\\alejandro\\AppData\\Local\\Temp\\jest",
  // Automatically clear mock calls, instances, contexts and results before every test
  // clearMocks: false,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    'index.ts',
    'entities',
    'interface',
    'tools',
    'type',
    '_mock',
    //   "\\\\node_modules\\\\"
  ],
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  testPathIgnorePatterns: ['dist'],
  // Use a custom resolver for TypeScript and web compatibility
  resolver: 'jest-ts-webcompat-resolver',
};

export default config;

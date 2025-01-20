import { vi } from 'vitest';
import '@testing-library/jest-dom'; 

// Global mocks or setup
vi.mock('some-module', () => ({
  someFunction: vi.fn().mockReturnValue('mocked value'),
}));

// Set up global variables for testing
globalThis.someGlobalVariable = 'test value';

// You can also import any global setup functions or utilities
import '@testing-library/jest-dom';  // For additional matchers like .toBeInTheDocument()

// If you're using any setup for custom test environment
beforeAll(() => {
  // Perform any global setup, such as connecting to a mock server
  console.log('Global setup before all tests');
});

afterAll(() => {
  // Clean up resources after all tests
  console.log('Global teardown after all tests');
});

beforeEach(() => {
  // Perform any setup before each individual test
  console.log('Test setup before each test');
});

afterEach(() => {
  // Clean up resources after each individual test
  console.log('Test cleanup after each test');
});

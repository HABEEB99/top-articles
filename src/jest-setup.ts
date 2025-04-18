// Mock Vite's import.meta.env
Object.defineProperty(global, "import", {
  value: {
    meta: {
      env: {
        VITE_NYT_API_KEY: "mock-api-key",
      },
    },
  },
  writable: true,
});

// Polyfill TextEncoder for jsdom
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder } = require("util");
  global.TextEncoder = TextEncoder;
}

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.{js,jsx,ts,tsx}",
  },
  env: {
    VITE_NYT_API_KEY: process.env.VITE_NYT_API_KEY || "mock-api-key",
  },
});

# Top Articles

**Top Articles** is a modern web application that fetches and displays popular articles from the New York Times API. Users can browse articles, view detailed information, and filter content by search term or section. The application is built with a focus on performance, accessibility, and a seamless user experience.

---

## Table of Contents

- [Top Articles](#top-articles)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Set Up Environment Variables](#set-up-environment-variables)
  - [Running the Application](#running-the-application)
    - [Start the Development Server](#start-the-development-server)
    - [Build for Production](#build-for-production)
    - [Preview the Production Build](#preview-the-production-build)
  - [Executing Tests](#executing-tests)
    - [Run Unit Tests](#run-unit-tests)
    - [Run Specific Tests](#run-specific-tests)
    - [Run End-to-End Tests](#run-end-to-end-tests)
  - [Generating Coverage Reports](#generating-coverage-reports)
  - [Project Structure](#project-structure)
  - [Environment Variables](#environment-variables)
    - [Required](#required)

---

## Technologies Used

- **TypeScript**: Static typing for enhanced code reliability and maintainability.
- **React**: Component-based UI development.
- **Tailwind CSS**: Utility-first CSS framework for rapid and responsive styling.
- **Vite**: Fast build tool and development server.
- **React Router**: Client-side routing and navigation.
- **Tanstack Query**: Efficient data fetching and state management.
- **Axios**: HTTP requests to the New York Times API.
- **Framer Motion**: Smooth animations and transitions.
- **Lucide React**: Accessible and customizable icons.
- **Jest**: Unit testing.
- **React Testing Library**: Testing React components.
- **Cypress**: End-to-end testing.
- **ESLint**: Code linting and style consistency.

---

## Prerequisites

Before you begin, ensure the following are installed:

- **Node.js**: Version 18.x or 20.x (recommended: 18.x).
- **npm**: Version 8.x or later (comes with Node.js).
- **Git**: For cloning the repository.

You’ll also need a **New York Times API key**. Sign up at [NYT Developer Portal](https://developer.nytimes.com/) to obtain one.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/HABEEB99/top-articles
cd top-articles
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add your NYT API key:

```
VITE_NYT_API_KEY=your_api_key_here
```

---

## Running the Application

### Start the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

### Build for Production

```bash
npm run build
```

Generates a production-ready build in the `dist` directory.

### Preview the Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

---

## Executing Tests

This project uses **Jest** and **React Testing Library** for unit tests and **Cypress** for E2E tests.

### Run Unit Tests

```bash
npm run test
```

Runs all Jest tests in the `src/tests` directory.

### Run Specific Tests

```bash
npx jest src/tests/components/article-card.test.tsx
```

### Run End-to-End Tests

Open the Cypress Test Runner:

```bash
npm run cypress:open
```

Run Cypress tests headlessly:

```bash
npm run cypress:run
```

---

## Generating Coverage Reports

To generate test coverage reports:

```bash
npm run test:coverage
```

Outputs reports to the `coverage` directory:

- **LCOV**: For tools like SonarQube
- **Text**: Console summary
- **HTML**: View in browser (`coverage/index.html`)

> The project enforces a **90% coverage threshold** for branches, functions, lines, and statements.

---

## Project Structure

```
top-articles/
├── cypress/                  # Cypress end-to-end tests
│   ├── e2e/
│   ├── support/
│   └── tsconfig.json
├── src/                      # Source code
│   ├── api/                  # API fetching logic
│   ├── components/           # Reusable components
│   ├── hooks/                # Custom React hooks
│   ├── interfaces/           # TypeScript interfaces
│   ├── pages/                # Page components
│   ├── tests/                # Unit tests
│   ├── jest-setup.ts         # Jest setup
│   ├── setupTests.ts         # DOM setup
│   ├── vite-env.d.ts         # Vite env types
│   └── App.tsx               # Main component
├── .env                      # Env variables (not tracked)
├── cypress.config.ts         # Cypress config
├── jest.config.ts            # Jest config
├── package.json              # Metadata and dependencies
├── tsconfig.json             # TypeScript config
├── tsconfig.app.json         # App-specific TS config
├── tsconfig.node.json        # Node-specific TS config
├── vite.config.ts            # Vite config
└── README.md                 # This file
```

---

## Environment Variables

### Required

```
VITE_NYT_API_KEY=your_api_key_here
```

For Jest tests, the API key is mocked in `src/jest-setup.ts` as `mock-api-key`. To use a real key in tests:

```json
"scripts": {
  "test": "cross-env VITE_NYT_API_KEY=mock-api-key jest --no-deprecation"
}
```

---

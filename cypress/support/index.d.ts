/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      mockApi(response: any): Chainable<void>;
    }
  }
}

export {};

/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      mockApi(response: any): Chainable<void>;
    }
  }
}

Cypress.Commands.add("mockApi", (response) => {
  cy.intercept("GET", "**/mostpopular/v2/viewed/30.json*", response).as(
    "getArticles"
  );
});

/// <reference types="cypress" />

Cypress.Commands.add("mockApi", (response) => {
  cy.intercept("GET", "**/mostpopular/v2/viewed/30.json*", response).as(
    "getArticles"
  );
});

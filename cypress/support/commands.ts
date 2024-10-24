/// <reference types="cypress" />

Cypress.Commands.add("loginViaGitHub", () => {
  cy.task("GitHubSocialLogin", {
    username: Cypress.env("GITHUB_USER"),
    password: Cypress.env("GITHUB_PASSWORD"),
    loginUrl: `${Cypress.env("CYPRESS_BASE_URL")}/sign-in`,
    headless: false,
    loginSelector: '[data-testid="cypress-btnSignIn"]',
    postLoginSelector: '[data-testid="cypress-title"]'
  });
});

Cypress.Commands.add("mockSession", (session = {}) => {
  const defaultSession = {
    user: {
      login: "GiovannyFialho",
      email: "giovannyf@outlook.com",
      avatar_url: "https://avatars.githubusercontent.com/u/8743217?v=4",
      node_id: "MDQ6VXNlcjg3NDMyMTc=",
      html_url: "https://github.com/GiovannyFialho"
    },
    expires: "2024-11-23T02:32:20.694Z"
  };

  cy.intercept("/api/auth/session", {
    statusCode: 200,
    body: { ...defaultSession, ...session }
  }).as("getSession");
});

Cypress.Commands.add("visitUserPage", (username) => {
  cy.visit("");

  cy.get("[data-testid='cypress-inputSearch']").type(username);
  cy.get("[data-testid='cypress-btnHandleSearch']").click();

  cy.get("[data-testid='cypress-containerUsersList']")
    .find("[data-testid='cypress-userCard']")
    .click();

  cy.url().should("contain", username);
});

Cypress.Commands.add("visitProfilePage", () => {
  cy.visit("");
  cy.get("[data-testid='cypress-hamburguerMenu']").should("exist").click();
  cy.get("[data-testid='cypress-profileTrigger']").should("exist").click();

  cy.get("[data-testid='cypress-linkToProfilePage']").should("exist").click();
});

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

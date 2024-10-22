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
      name: "Mocked User",
      email: "mockeduser@example.com",
      image: "https://robohash.org/mock"
    },
    expires: new Date(Date.now() + 86400 * 1000).toISOString()
  };

  cy.intercept("/api/auth/session", {
    statusCode: 200,
    body: { ...defaultSession, ...session }
  }).as("getSession");
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

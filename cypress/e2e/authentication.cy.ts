describe("GitHub Login Test", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
  });

  it("should redirect to sign-in page if the user is not authenticated", () => {
    cy.visit("http://localhost:3000");

    cy.getCookie(Cypress.env("COOKIE_NAME")).then((cookie) => {
      if (cookie) {
        cy.url().should("eq", Cypress.env("CYPRESS_BASE_URL"));
        cy.get("[data-testid='cypress-title']").should("exist");
      } else {
        cy.url().should("include", "/sign-in");
        cy.get("[data-testid='cypress-btnSignIn']").should("exist");
      }
    });
  });

  it("should log in to the application", () => {
    cy.visit("http://localhost:3000/sign-in");

    cy.get("[data-testid='cypress-btnSignIn']").click();

    cy.origin("https://github.com/", () => {
      cy.get("#login_field").type(Cypress.env("GITHUB_USER"));
      cy.get("#password").type(Cypress.env("GITHUB_PASSWORD"));

      cy.get("[data-signin-label='Sign in']").click();
    });

    cy.get(".logged-in").then((page) => {
      if (page.length > 0) {
        cy.get(".js-oauth-authorize-btn").click();
      }
    });

    cy.get(".page").then((page) => {
      if (page.length > 0) {
        cy.get("[type='submit']").click();
      }
    });

    cy.get("[data-testid='cypress-title']").should("exist");
  });
});

describe("GitHub login test", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("should redirect to sign-in page if the user is not authenticated", () => {
    cy.visit("/");

    cy.getCookie(Cypress.env("COOKIE_NAME")).then((cookie) => {
      if (cookie) {
        cy.url().should("eq", "/");
        cy.get("[data-testid='cypress-title']").should("exist");
      } else {
        cy.url().should("include", "/sign-in");
        cy.get("[data-testid='cypress-btnSignIn']").should("exist");
      }
    });
  });

  it("should log-in using a mocked GitHub session", () => {
    cy.mockSession();
    cy.visit("/");
    cy.wait("@getSession");

    cy.get('[data-testid="cypress-title"]').should("exist");
  });

  it("should log-out", () => {
    cy.mockSession();
    cy.visit("/");
    cy.wait("@getSession");

    cy.get("[data-testid='cypress-hamburguerMenu']").should("exist").click();
    cy.get("[data-testid='cypress-profileTrigger']").should("exist").click();
    cy.get("[data-testid='cypress-signOutTrigger']").should("exist").click();

    cy.url().should("include", "/sign-in");
  });
});

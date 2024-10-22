describe("GitHub Login Test", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("should redirect to sign-in page if the user is not authenticated", () => {
    cy.visit(Cypress.env("CYPRESS_BASE_URL"));

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
});

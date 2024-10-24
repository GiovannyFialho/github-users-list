describe("User page", () => {
  beforeEach(() => {
    cy.mockSession();

    cy.visitUserPage("GiovannyFialho");

    cy.wait("@getSession");
  });

  it("should find link to github page", () => {
    cy.get("[data-testid='cypress-userGithubURL']").should("exist");

    cy.get("[data-testid='cypress-userGithubURL']")
      .should("have.attr", "href")
      .and("contain", "GiovannyFialho");
  });

  it("should back to home page", () => {
    cy.get("[data-testid='cypress-hamburguerMenu']").should("exist").click();

    cy.get("[data-testid='cypress-linkToHomePage']").should("exist").click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});

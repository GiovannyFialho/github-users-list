describe("Change language", () => {
  beforeEach(() => {
    cy.mockSession();

    cy.visit("");

    cy.wait("@getSession");
  });

  it("should open profile drawer and access profile page", () => {
    cy.visiProfilePage();

    cy.url().should("contain", "/profile");
  });

  it("should verify user page link", () => {
    cy.visiProfilePage();

    cy.get("[data-testid='cypress-userPageProfile']").should("exist").click();
  });

  it("should verify github profile link page", () => {
    cy.visiProfilePage();

    cy.get("[data-testid='cypress-githubProfilePage']")
      .should("have.attr", "href")
      .and("contain", "GiovannyFialho");
  });
});

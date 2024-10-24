describe("Change language", () => {
  beforeEach(() => {
    cy.mockSession();

    cy.visit("");

    cy.wait("@getSession");
  });

  it("should open profile drawer and access profile page", () => {
    cy.visitProfilePage();

    cy.url().should("contain", "/profile");
  });

  it("should verify user page link", () => {
    cy.visitProfilePage();

    cy.get("[data-testid='cypress-userPageProfile']").should("exist").click();
  });

  it("should verify github profile link page", () => {
    cy.visitProfilePage();

    cy.get("[data-testid='cypress-githubProfilePage']")
      .should("have.attr", "href")
      .and("contain", "GiovannyFialho");
  });
});

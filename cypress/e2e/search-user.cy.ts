describe("Search user", () => {
  before(() => {
    cy.mockSession({
      user: {
        name: "Giovanny",
        email: "giovanny@example.com",
        image: "https://robohash.org/giovanny"
      }
    });

    cy.visit("/");

    cy.wait("@getSession");
  });

  it("should write in input search and find for users", () => {
    cy.visit("");

    cy.get("[data-testid='input-search']").type("giovanny");
    cy.get("[data-testid='btn-handleSearch']").click();

    cy.get("[data-testid='container-usersList']")
      .find("[data-testid='user-card']")
      .should("have.length.greaterThan", 0);
  });
});

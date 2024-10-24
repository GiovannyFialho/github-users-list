describe("Search user", () => {
  beforeEach(() => {
    cy.mockSession();

    cy.visit("");

    cy.wait("@getSession");
  });

  it("should write in input search and click in the button 'search', after that, it should return users", () => {
    cy.visit("");

    cy.get("[data-testid='cypress-inputSearch']").type("giovanny");
    cy.get("[data-testid='cypress-btnHandleSearch']").click();

    cy.get("[data-testid='cypress-containerUsersList']")
      .find("[data-testid='cypress-userCard']")
      .should("have.length.greaterThan", 0);
  });

  it("should write in the input search and press the 'Enter' key, after that, it should return users", () => {
    cy.visit("");

    cy.get("[data-testid='cypress-inputSearch']").type("giovanny{enter}");

    cy.get("[data-testid='cypress-containerUsersList']")
      .find("[data-testid='cypress-userCard']")
      .should("have.length.greaterThan", 0);
  });

  it("should write anything in input search and click in the button 'search', after that, it should return any user", () => {
    cy.visit("");

    cy.get("[data-testid='cypress-btnHandleSearch']").click();

    cy.get("[data-testid='cypress-containerUsersList']")
      .find("[data-testid='cypress-userCard']")
      .should("have.length", 0);
  });

  it("should write in input search some user that doesn't exist and click in the button 'search', after that, it should return a text", () => {
    cy.visit("");

    cy.get("[data-testid='cypress-inputSearch']").type("uuuu11111222233");
    cy.get("[data-testid='cypress-btnHandleSearch']").click();

    cy.get("[data-testid='cypress-containerUsersList']")
      .find("[data-testid='cypress-nobodyFind']")
      .should("exist");
  });

  it("should access user page", () => {
    cy.visit("");

    cy.get("[data-testid='cypress-inputSearch']").type("GiovannyFialho");
    cy.get("[data-testid='cypress-btnHandleSearch']").click();

    cy.get("[data-testid='cypress-containerUsersList']")
      .find("[data-testid='cypress-userCard']")
      .click();

    cy.url().should("contain", "GiovannyFialho");
  });
});

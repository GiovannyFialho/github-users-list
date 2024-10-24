describe("Change theme", () => {
  beforeEach(() => {
    cy.mockSession();

    cy.visit("");

    cy.wait("@getSession");

    cy.setCookie("theme", "light");
  });

  it("should verify the current theme", () => {
    cy.visit("");
    cy.get("[data-testid='cypress-hamburguerMenu']").should("exist").click();

    cy.getCookie("theme").should("have.property", "value", "light");
  });

  it("should change theme", () => {
    cy.visit("");
    cy.get("[data-testid='cypress-hamburguerMenu']").should("exist").click();

    cy.get("[data-testid='cypress-themeTrigger']").should("exist").click();

    cy.getCookie("theme").should("have.property", "value", "dark");
  });
});

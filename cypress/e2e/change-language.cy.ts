describe("Change language", () => {
  beforeEach(() => {
    cy.mockSession();

    cy.visit("");

    cy.wait("@getSession");

    cy.setCookie("i18next", "pt-BR");
  });

  it("should open language drawer and verify the current languange", () => {
    cy.visit("");
    cy.get("[data-testid='cypress-hamburguerMenu']").should("exist").click();

    cy.get("[data-testid='cypress-changeLanguageTrigger']")
      .should("exist")
      .click();

    cy.get("[data-testid='cypress-languageChecked']").should("exist");
  });

  it("should change languange", () => {
    cy.visit("");
    cy.get("[data-testid='cypress-hamburguerMenu']").should("exist").click();

    cy.get("[data-testid='cypress-changeLanguageTrigger']")
      .should("exist")
      .click();

    cy.get("[data-testid='cypress-enUSLang']").should("exist").click();

    cy.getCookie("i18next").should("have.property", "value", "en-US");
  });
});

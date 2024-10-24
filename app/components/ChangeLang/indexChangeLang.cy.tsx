import ChangeLang from "@/app/components/ChangeLang";

describe("<ChangeLang />", () => {
  it("should render on desktop", () => {
    cy.viewport(1280, 800);
    cy.mount(<ChangeLang />);

    cy.get("[data-testid='cypress-changeLanguageTrigger']").click();
    cy.get("[data-testid='cypress-ptBRLang']").should("exist");
  });

  it("should render on mobile", () => {
    cy.mount(<ChangeLang />);

    cy.get("[data-testid='cypress-changeLanguageTrigger']")
      .should("be.visible")
      .click();
    cy.get("[data-testid='cypress-ptBRLang']").should("be.visible");
  });
});

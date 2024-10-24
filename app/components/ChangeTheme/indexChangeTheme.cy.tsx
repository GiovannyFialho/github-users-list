import ChangeTheme from "@/app/components/ChangeTheme";
import { ThemeProvider } from "@/app/context/ThemeContext";

describe("<ChangeTheme />", () => {
  it("should render theme component", () => {
    cy.mount(
      <ThemeProvider initialTheme="light">
        <ChangeTheme />
      </ThemeProvider>
    );

    cy.get("[data-testid='cypress-themeTrigger']").should("be.visible");
  });
});

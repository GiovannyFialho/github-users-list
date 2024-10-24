import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import Profile from "@/app/components/Profile";

const mountWithSession = (component: JSX.Element, session: Session) => {
  return cy.mount(
    <SessionProvider session={session}>{component}</SessionProvider>
  );
};

describe("<Profile />", () => {
  const mockSession = {
    user: {
      login: "GiovannyFialho",
      email: "giovannyf@outlook.com",
      avatar_url: "https://avatars.githubusercontent.com/u/8743217?v=4",
      node_id: "MDQ6VXNlcjg3NDMyMTc=",
      html_url: "https://github.com/GiovannyFialho"
    },
    expires: "2024-11-23T02:32:20.694Z"
  };

  it("should render profile component on desktop", () => {
    cy.viewport(1280, 800);
    mountWithSession(<Profile />, mockSession);

    cy.get("[data-testid='cypress-profileTrigger']").should("be.visible");
    cy.get("[data-testid='cypress-profileTrigger']").click();

    cy.get("[data-testid='cypress-linkToProfilePage']").should("be.visible");
  });

  it("should render profile component on mobile", () => {
    mountWithSession(<Profile />, mockSession);

    cy.get("[data-testid='cypress-profileTrigger']").should("be.visible");
    cy.get("[data-testid='cypress-profileTrigger']").click();

    cy.get("[data-testid='cypress-linkToProfilePage']").should("be.visible");
  });
});

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import UserAvatar from "@/app/components/UserAvatar";

const mountWithSession = (component: JSX.Element, session: Session) => {
  return cy.mount(
    <SessionProvider session={session}>{component}</SessionProvider>
  );
};

describe("<UserAvatar />", () => {
  const mockUserWithImage = {
    user: {
      name: "Giovanny Fialho",
      login: "GiovannyFialho",
      email: "giovannyf@outlook.com",
      avatar_url: "https://avatars.githubusercontent.com/u/8743217?v=4",
      avatarUrl: "https://avatars.githubusercontent.com/u/8743217?v=4",
      node_id: "MDQ6VXNlcjg3NDMyMTc=",
      html_url: "https://github.com/GiovannyFialho"
    },
    expires: "2024-11-23T02:32:20.694Z"
  };

  const mockUserWithoutImage = {
    user: {
      name: "Giovanny Fialho",
      login: "GiovannyFialho",
      email: "giovannyf@outlook.com",
      node_id: "MDQ6VXNlcjg3NDMyMTc=",
      html_url: "https://github.com/GiovannyFialho"
    },
    expires: "2024-11-23T02:32:20.694Z"
  };

  it("should render UserAvatar with image", () => {
    mountWithSession(
      <UserAvatar user={mockUserWithImage.user} />,
      mockUserWithImage
    );

    cy.get("img[alt='Profile.avatar.alt']").should("be.visible");
  });

  it("should render UserAvatar without image", () => {
    mountWithSession(
      <UserAvatar user={mockUserWithoutImage.user} />,
      mockUserWithoutImage
    );

    cy.get("svg")
      .should("have.class", "lucide lucide-circle-user")
      .should("be.visible");
  });
});

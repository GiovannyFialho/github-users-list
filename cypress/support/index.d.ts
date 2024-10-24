// cypress/support/index.d.ts

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in via GitHub using social login plugin.
     * @example cy.loginViaGitHub()
     */
    loginViaGitHub(): Chainable<void>;

    /**
     * Custom command to mock the authentication session.
     * @param session Partial session object to mock the auth session
     * @example cy.mockSession({ user: { name: 'Giovanny' } })
     */
    mockSession(
      session?: Partial<{
        user: {
          login: string;
          email: string;
          avatar_url: string;
          node_id: string;
          html_url: string;
        };
        expires: string;
      }>
    ): Chainable<void>;

    /**
     * Custom command to access user page.
     * @param username username string to access user page
     * @example cy.visitUserPage("GiovannyFialho")
     */
    visitUserPage(username: string): Chainable<void>;

    /**
     * Custom command to access profile page.
     * @example cy.visitProfilePage()
     */
    visitProfilePage(): Chainable<void>;
  }
}

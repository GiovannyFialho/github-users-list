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
        user: { name: string; email: string; image: string };
        expires: string;
      }>
    ): Chainable<void>;
  }
}

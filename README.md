# GitHub User List

## Initialize
```
npm run initialize
```

## Dev environment
```
npm run dev
```

### References for color palettes
- Palette Generator: [Realtime Colors](https://www.realtimecolors.com/)

### GitHub API
You'll need a token from GitHub and add it to the `.env` variable `NEXT_PUBLIC_GITHUB_TOKEN`. To generate this token, access: https://github.com:
```
Settings > Developer Settings > Personal acess tokens > tokens (classic)
```
After that, click on the "Generate new token" button and choose the "Generate new token (classic)" option. And select all permissions that you need.

### Libraries

#### Authentication
- [NextAuth](https://next-auth.js.org/)

#### Internationalization
- [React i18next](https://react.i18next.com/)

#### Requests
> GraphQL was used to search for users in the GitHub API.

- [Apollo Client](https://www.apollographql.com/)
- [GraphQL Codegen](https://the-guild.dev/graphql/codegen) (For generating types for Queries, Mutations, and Fragments)

#### Tests (E2E and Components)
- [Cypress](https://www.cypress.io/)

#### Context
> For the theme management functionality, I used createContext from React.
- [Zustand](https://zustand-demo.pmnd.rs/)

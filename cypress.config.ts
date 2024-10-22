import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "http://localhost:3000",
    env: {
      COOKIE_NAME: "next-auth.session-token"
    }
  }
});

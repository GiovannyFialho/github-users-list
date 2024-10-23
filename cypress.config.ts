import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "dwczah",
  e2e: {
    chromeWebSecurity: false,
    env: {
      COOKIE_NAME: "next-auth.session-token"
    }
  }
});

import { defineConfig } from "cypress";
import { plugins } from "cypress-social-logins";

const { GitHubSocialLogin } = plugins;

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    env: {
      CYPRESS_BASE_URL: "http://localhost:3000",
      COOKIE_NAME: "next-auth.session-token",
      GITHUB_USER: "giovannyf@outlook.com",
      GITHUB_PASSWORD: "Gi62842543"
    },
    setupNodeEvents(on) {
      on("task", {
        GitHubSocialLogin
      });
    }
  }
});

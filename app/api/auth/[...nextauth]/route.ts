import { Endpoints } from "@octokit/types";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export type GitHubProfile = Endpoints["GET /user"]["response"]["data"];

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    })
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        const githubProfile = profile as GitHubProfile;

        Object.assign(token, githubProfile);
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session.user, token);

      return session;
    }
  }
});

export { handler as GET, handler as POST };

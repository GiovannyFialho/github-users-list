import { type GitHubProfile } from "@/app/types/next-auth";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

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

        token.id = githubProfile.id as string;
        token.login = githubProfile.login as string;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.login = token.login as string;

      return session;
    }
  }
});

export { handler as GET, handler as POST };

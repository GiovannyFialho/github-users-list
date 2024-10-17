import { type GitHubProfile } from "@/app/api/auth/[...nextauth]/route";

declare module "next-auth" {
  interface Session {
    user: Partial<GitHubProfile>;
  }
}

declare module "next-auth/jwt" {
  type JWT = Partial<GitHubProfile>;
}

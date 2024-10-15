// Interface para o perfil do GitHub
export interface GitHubProfile {
  id: string;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
}

// Sobrescreve a tipagem padrão de "next-auth"
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      login: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    login: string;
  }
}

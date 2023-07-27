import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

const hanlder = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.SECRET!,
  callbacks: {
    async redirect() {
      return "/";
    },
  },
});

export { hanlder as GET, hanlder as POST };

import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const hanlder = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const user = await (
          await fetch(
            `http://localhost:3000/api/user/signin?provider=credentials&name=${credentials?.username}&password=${credentials?.password!}`,
          )
        ).json();
        if (user["Error"]) {
          return null;
        }

        return {
          id: user["_id"],
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  secret: process.env.SECRET!,
  callbacks: {
    async redirect() {
      return "/";
    },
    async session({ token, session }) {
      if (token) {
        session.user!.name = token.name;
        session.user!.email = token.email;
        session.user!.image = token.picture;
      }

      return session;
    },

    async jwt({ token, account }) {
      let dbUser;
      if (account?.provider == "github") {
        dbUser = await (
          await fetch(
            `http://localhost:3000/api/user/signin?provider=github&name=${token.name}&email=${token.email}&image=${token.picture}`,
          )
        ).json();

        return {
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
        };
      }

      return token;
    },
  },
});

export { hanlder as GET, hanlder as POST };

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
      async authorize(credentials, _req) {
        // Add logic here to look up the user from the credentials supplied

        const user = await (
          await fetch(
            `${
              process.env.NEXT_PUBLIC_URL
            }/api/user/signin?provider=credentials&name=${credentials?.username}&password=${credentials?.password!}`,
          )
        ).json();
        if (user["Error"]) {
          throw new Error(user.Error);
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

  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async redirect() {
      return "/";
    },
    async session({ token, session }) {
      if (token) {
        session.user!.name = token.name;
        session.user!.email = token.email;
        session.user!.image = token.picture;
        session.user!.id = token.sub;
      }

      return session;
    },

    async jwt({ token, account }) {
      let dbUser;
      if (account?.provider == "github") {
        dbUser = await (
          await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/user/signin?provider=github&name=${token.name}&email=${token.email}&image=${token.picture}`,
          )
        ).json();

        return {
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
          sub: dbUser["_id"],
        };
      }

      return token;
    },
  },
});

export { hanlder as GET, hanlder as POST };

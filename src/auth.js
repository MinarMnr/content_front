import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const response = await fetch("http://192.168.1.192:8004/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const user = await response.json();

          if (response.ok && user) {
            return user;
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  //   pages: {
  //     signIn: "/login",
  //   },

  pages: {
    signIn: "/auth/login", // Custom login page
    error: "/auth/error", // Custom error page
  },
});

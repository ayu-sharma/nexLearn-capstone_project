import { GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/helpers/constants"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
        clientId: GITHUB_ID,
        clientSecret: GITHUB_SECRET
    }),
  ]
})

export { handler as GET, handler as POST }
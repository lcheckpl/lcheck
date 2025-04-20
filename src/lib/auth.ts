import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "@/generated/prisma/client"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()
export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	socialProviders: {
		discord: {
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
		},
	},
})

export async function requireAuth() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})
	if (!session?.user) {
		return redirect("/login")
	}
}

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
	user: {
		additionalFields: {
			selectedServer: {
				type: "string",
				required: false,
				input: true,
			},
		},
	},
	socialProviders: {
		discord: {
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			scope: ["guilds"],
		},
	},
})

export async function requireAuth() {
	const session = await getSession()
	if (!session?.user) {
		return redirect("/login")
	}
	const user = await prisma.user.findFirst({
		include: { accounts: true },
		where: {
			AND: {
				id: session?.user.id,
				accounts: {
					some: {
						providerId: "discord",
					},
				},
			},
		},
	})
	if (!user) {
		return redirect("/login")
	}
	const token = user.accounts[0].accessToken
	const result = await fetch("https://discord.com/api/users/@me", {
		headers: {
			authorization: `Bearer ${token}`,
		},
	})
	if (!result.ok) {
		auth.api.signOut({
			headers: await headers(),
		})
		return redirect("/login")
	}
}

export async function getSession() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})
	return session
}

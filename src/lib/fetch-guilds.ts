import { prisma } from "@/lib/prisma"
import { calculate } from "discord-permission"
import { getSession } from "./auth"

export interface UserGuild {
	id: string
	name: string
	icon: string
	owner: boolean
	admin: boolean
}

export interface IFetchGuilds {
	status: number
	guilds: UserGuild[]
}

export async function fetchGuilds(): Promise<IFetchGuilds> {
	const session = await getSession()

	const user = await prisma.user.findFirstOrThrow({
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
	const token = user.accounts[0].accessToken
	const result = await fetch("https://discord.com/api/users/@me/guilds", {
		headers: {
			authorization: `Bearer ${token}`,
		},
	})
	if (!result.ok) {
		return {
			status: result.status,
			guilds: [],
		}
	}
	const json: [
		{
			id: string
			name: string
			icon: string
			owner: boolean
			permissions: number
		},
	] = await result.json()

	const mappedGuilds: UserGuild[] = json
		.filter(
			(item) =>
				calculate("ADMINISTRATOR", item.permissions) || item.owner,
		)
		.map((item) => ({
			id: item.id,
			name: item.name,
			icon: item.icon,
			owner: item.owner,
			admin: true,
		}))

	return { status: result.status, guilds: mappedGuilds }
}

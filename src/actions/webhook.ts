"use server"

import { getSession } from "@/lib/auth"
import { fetchGuilds } from "@/lib/fetch-guilds"
import { prisma } from "@/lib/prisma"

export async function getWebhook(serverId: string) {
	const session = await getSession()
	if (!session?.user) {
		return {
			error: true,
			content: "",
		}
	}
	const guilds = await fetchGuilds()

	if (guilds.status != 200) {
		return {
			error: true,
			content: "",
		}
	}

	const guild = guilds.guilds.find((guild) => guild.id === serverId)
	if (!guild || !guild.admin) {
		return {
			error: true,
			content: "",
		}
	}

	const settings = await prisma.serverSettings.findFirst({
		where: {
			id: serverId,
		},
	})

	if (!settings) {
		return {
			error: true,
			content: "",
		}
	}

	return {
		error: false,
		content: settings.webhookUrl,
	}
}

export async function setWebhook(serverId: string, webhookUrl: string) {
	const session = await getSession()
	if (!session?.user) {
		return {
			error: true,
			content: "",
		}
	}
	const guilds = await fetchGuilds()

	if (guilds.status != 200) {
		return {
			error: true,
			content: "",
		}
	}

	const guild = guilds.guilds.find((guild) => guild.id === serverId)
	if (!guild || !guild.admin) {
		return {
			error: true,
			content: "",
		}
	}

	await prisma.serverSettings.upsert({
		where: {
			id: serverId,
		},
		update: {
			webhookUrl: webhookUrl,
		},
		create: {
			id: serverId,
			webhookUrl: webhookUrl,
		},
	})

	return {
		error: false,
		content: "",
	}
}

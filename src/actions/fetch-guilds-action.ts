"use server"

import { fetchGuilds } from "@/lib/fetch-guilds"

export async function fetchGuildsAction() {
	return await fetchGuilds()
}

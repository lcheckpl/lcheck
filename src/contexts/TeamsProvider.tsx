"use client"

import { UserGuilds } from "@/lib/fetchGuilds"
import React, { createContext, useContext, ReactNode } from "react"

const TeamsContext = createContext<UserGuilds[]>([])

export const TeamsProvider = ({
	children,
	teams,
}: {
	children: ReactNode
	teams: UserGuilds[]
}) => {
	return (
		<TeamsContext.Provider value={teams}>{children}</TeamsContext.Provider>
	)
}

export const useTeams = () => {
	const context = useContext(TeamsContext)
	if (context === undefined) {
		throw new Error("useTeams must be used within a TeamsProvider")
	}
	return context
}

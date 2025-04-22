"use client"

import { authClient } from "@/lib/auth-client"
import { UserGuild } from "@/lib/fetch-guilds"
import React, {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from "react"

type ActiveTeamContextType = {
	activeTeam: UserGuild | null
	setActiveTeam: React.Dispatch<React.SetStateAction<UserGuild | null>>
}

const TeamsContext = createContext<UserGuild[]>([])
const ActiveTeamContext = createContext<ActiveTeamContextType | undefined>(
	undefined,
)

export const TeamsProvider = ({
	children,
	teams,
	activeTeam,
}: {
	children: ReactNode
	teams: UserGuild[]
	activeTeam?: UserGuild
}) => {
	const [activeTeamState, setActiveTeam] = useState<UserGuild | null>(
		activeTeam || teams[0] || null,
	)
	useEffect(() => {
		async function updateAsync() {
			await authClient.updateUser({
				selectedServer: activeTeamState?.id,
			})
		}
		updateAsync()
	}, [activeTeamState])

	return (
		<TeamsContext.Provider value={teams}>
			<ActiveTeamContext.Provider
				value={{ activeTeam: activeTeamState, setActiveTeam }}
			>
				{children}
			</ActiveTeamContext.Provider>
		</TeamsContext.Provider>
	)
}

export const useTeams = () => {
	const context = useContext(TeamsContext)
	if (context === undefined) {
		throw new Error("useTeams must be used within a TeamsProvider")
	}
	return context
}

export const useActiveTeam = () => {
	const context = useContext(ActiveTeamContext)
	if (context === undefined) {
		throw new Error("useActiveTeam must be used within a TeamsProvider")
	}
	return context
}

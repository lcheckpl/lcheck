"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "../ui/skeleton"
import { fetchGuilds, UserGuilds } from "@/actions/fetchGuilds"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function TeamSwitcher() {
	const [teams, setTeams] = React.useState<UserGuilds[]>([])
	const { isMobile } = useSidebar()
	const [activeTeam, setActiveTeam] = React.useState(teams[0])

	React.useEffect(() => {
		async function asyncTeamsSet() {
			const fetchedGuilds = await fetchGuilds()
			setTeams(fetchedGuilds)
			setActiveTeam(fetchedGuilds[0])
		}
		asyncTeamsSet()
	}, [])

	if (!activeTeam) {
		return (
			<SidebarMenuButton size="lg" disabled>
				<Skeleton className="h-full w-full" />
			</SidebarMenuButton>
		)
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar>
								<AvatarImage
									src={`https://cdn.discordapp.com/icons/${activeTeam.id}/${activeTeam.icon}.png`}
									alt="Avatar"
								/>
								<AvatarFallback>
									{activeTeam.name[0]}
								</AvatarFallback>
							</Avatar>

							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{activeTeam.name}
								</span>
								<span className="truncate text-xs">
									{activeTeam.id}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Teams
						</DropdownMenuLabel>
						{teams.map((team) => (
							<DropdownMenuItem
								key={team.name}
								onClick={() => setActiveTeam(team)}
								className="gap-2 p-2"
							>
								<Avatar className="size-6">
									<AvatarImage
										src={`https://cdn.discordapp.com/icons/${team.id}/${team.icon}.png`}
										alt="Avatar"
									/>
									<AvatarFallback>
										{team.name[0]}
									</AvatarFallback>
								</Avatar>
								{team.name}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
								<Plus className="size-4" />
							</div>
							<div className="text-muted-foreground font-medium">
								Add team
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

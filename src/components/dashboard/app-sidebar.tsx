"use client"

import * as React from "react"
import { BookOpen, SquareTerminal, Star } from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar"

const data = {
	navMain: [
		{
			title: "Opinie",
			url: "/dashboard/reviews",
			icon: Star,
			isActive: true,
			items: [
				{
					title: "Przegląd",
					url: "/dashboard/reviews",
				},
				{
					title: "Zarządzaj",
					url: "/dashboard/reviews/manage",
				},
				{
					title: "Logi",
					url: "/dashboard/reviews/logs",
				},
			],
		},
		{
			title: "Webhook",
			url: "#",
			icon: SquareTerminal,

			items: [
				{
					title: "Ustawienia",
					url: "#",
				},
				{
					title: "Statystyki",
					url: "#",
				},
				{
					title: "Logi",
					url: "#",
				},
			],
		},
		{
			title: "Dokumentacja",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Podstawy",
					url: "#",
				},
				{
					title: "Konfiguracja webhooka",
					url: "#",
				},
				{
					title: "Uprawnienia",
					url: "#",
				},
				{
					title: "Profil serwera",
					url: "#",
				},
			],
		},
	],
}
interface User {
	name: string
	email: string
	avatar: string
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	user: User
}

export function AppSidebar({ ...props }: AppSidebarProps) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={props.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import NavBreadcrumb from "@/components/dashboard/nav-breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar"
import { TeamsProvider } from "@/contexts/teams-provider"
import { getSession, requireAuth } from "@/lib/auth"
import { fetchGuilds } from "@/lib/fetch-guilds"

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	await requireAuth()
	const [teams, session] = await Promise.all([fetchGuilds(), getSession()])

	const selectedServer = teams.guilds.find(
		(v) => v.id == session?.user.selectedServer,
	)

	return (
		<SidebarProvider>
			<TeamsProvider teams={teams.guilds} activeTeam={selectedServer}>
				<AppSidebar
					user={{
						name: session?.user.name || "BŁĄD",
						email: session?.user.email || "BŁĄD",
						avatar: session?.user.image || "?",
					}}
				/>
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator
								orientation="vertical"
								className="mr-2 data-[orientation=vertical]:h-4"
							/>
							<NavBreadcrumb />
						</div>
					</header>
					<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
						{children}
					</div>
				</SidebarInset>
			</TeamsProvider>
		</SidebarProvider>
	)
}

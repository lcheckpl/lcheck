import { AppSidebar } from "@/components/dashboard/app-sidebar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar"
import { TeamsProvider } from "@/contexts/TeamsProvider"
import { auth } from "@/lib/auth"
import { fetchGuilds } from "@/lib/fetchGuilds"
import { headers } from "next/headers"

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const [teams, session] = await Promise.all([
		fetchGuilds(),
		auth.api.getSession({
			headers: await headers(),
		}),
	])

	const selectedServer = teams.find(
		(v) => v.id == session?.user.selectedServer,
	)

	return (
		<SidebarProvider>
			<TeamsProvider teams={teams} activeTeam={selectedServer}>
				<AppSidebar />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator
								orientation="vertical"
								className="mr-2 data-[orientation=vertical]:h-4"
							/>
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem className="hidden md:block">
										<BreadcrumbLink href="#">
											Building Your Application
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator className="hidden md:block" />
									<BreadcrumbItem>
										<BreadcrumbPage>
											Data Fetching
										</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
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

import { NavBar } from "@/components/ui/tubelight-navbar"
import { ReactNode } from "react"

export function SiteScaffold({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<NavBar />
			<div className="p-6 py-24">{children}</div>
		</div>
	)
}

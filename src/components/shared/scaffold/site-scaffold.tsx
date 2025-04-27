import { NavBar } from "@/components/ui/tubelight-navbar"
import { ReactNode } from "react"

export function SiteScaffold({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col">
			<NavBar />
			{children}
		</div>
	)
}

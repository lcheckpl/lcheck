import { SiteScaffold } from "@/components/shared/scaffold/site-scaffold"
import { Loader2 } from "lucide-react"

export default function ServerLoading() {
	return (
		<SiteScaffold>
			<div className="mx-auto flex max-w-5xl flex-col gap-18">
				<Loader2 className="mx-auto size-10 animate-spin" />
			</div>
		</SiteScaffold>
	)
}

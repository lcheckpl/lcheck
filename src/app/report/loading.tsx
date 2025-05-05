import { SiteScaffold } from "@/components/shared/scaffold/site-scaffold"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingReport() {
	return (
		<SiteScaffold>
			<div className="mx-auto flex max-w-5xl flex-col gap-18">
				<h1>Nowe zgłoszenie</h1>
				<Skeleton className="h-96 w-full" />
			</div>
		</SiteScaffold>
	)
}

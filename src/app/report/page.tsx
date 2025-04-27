import ReportForm from "@/components/report/report-form"
import { SiteScaffold } from "@/components/shared/scaffold/site-scaffold"
import { requireAuth } from "@/lib/auth"

export default async function ReportPage() {
	await requireAuth()
	return (
		<SiteScaffold>
			<div className="mx-auto flex max-w-5xl flex-col gap-18">
				<h1>Nowe zgłoszenie</h1>
				<ReportForm />
			</div>
		</SiteScaffold>
	)
}

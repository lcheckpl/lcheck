import ReportForm from "@/components/report/report-form"
import { requireAuth } from "@/lib/auth"

export default async function ReportPage() {
	await requireAuth()
	return (
		<div className="mx-auto flex max-w-5xl flex-col gap-18 p-24">
			<h1>Nowe zgłoszenie</h1>
			<ReportForm />
		</div>
	)
}

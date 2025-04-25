import ReportForm from "@/components/report/report-form"
import { requireAuth } from "@/lib/auth"
import { fetchGuilds } from "@/lib/fetch-guilds"

export default async function ReportPage() {
	await requireAuth()
	const guilds = await fetchGuilds()
	return (
		<div className="mx-auto flex max-w-5xl flex-col gap-18 p-24">
			<h1>Nowe zgłoszenie</h1>
			<ReportForm servers={guilds} />
		</div>
	)
}

import ReportForm from "@/components/report/report-form"
import { requireAuth } from "@/lib/auth"
import { fetchGuilds } from "@/lib/fetch-guilds"

export default async function ReportPage() {
	await requireAuth()
	const guilds = await fetchGuilds()
	return (
		<div className="mx-auto max-w-5xl p-24">
			<ReportForm servers={guilds} />
		</div>
	)
}

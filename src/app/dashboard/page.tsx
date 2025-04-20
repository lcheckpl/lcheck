import { requireAuth } from "@/lib/auth"

export default async function DashboardPage() {
	await requireAuth()
	console.log("Dashboard")
	return <div>Dashboard</div>
}

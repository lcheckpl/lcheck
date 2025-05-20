import { requireAuth } from "@/lib/auth"

export default async function DashboardPage() {
	await requireAuth()

	return (
		<>
			<h1 className="flex flex-col items-center justify-center">
				Panel nie jest jeszcze gotowy
			</h1>
		</>
	)
}

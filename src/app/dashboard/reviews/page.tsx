"use client"

import { Card } from "@/components/ui/card"
import { ReviewList } from "@/components/dashboard/ReviewList"
import { ReviewStats } from "@/components/dashboard/ReviewStats"
import { useActiveTeam } from "@/contexts/teams-provider"
import { useEffect, useState } from "react"
import { fetchReviews } from "./actions"

export default function DashboardReviewsPage() {
	const { activeTeam } = useActiveTeam()
	const [reviews, setReviews] = useState([])

	useEffect(() => {
		if (activeTeam?.id) {
			fetchReviews(activeTeam.id).then(setReviews)
		}
	}, [activeTeam?.id])

	if (!activeTeam?.id) {
		return (
			<Card className="p-6">
				<p className="text-muted-foreground text-center">
					Wybierz serwer, aby zobaczyć statystyki opinii
				</p>
			</Card>
		)
	}

	return (
		<div className="space-y-8">
			<ReviewStats reviews={reviews} />
			<ReviewList reviews={reviews} />
		</div>
	)
}

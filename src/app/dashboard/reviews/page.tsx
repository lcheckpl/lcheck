"use client"

import { Card } from "@/components/ui/card"
import { ReviewList } from "@/components/dashboard/ReviewList"
import { ReviewStats } from "@/components/dashboard/ReviewStats"
import { useActiveTeam } from "@/contexts/teams-provider"
import { useEffect, useState } from "react"
import { fetchReviews } from "./actions"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardReviewsPage() {
	const { activeTeam } = useActiveTeam()
	const [reviews, setReviews] = useState<
		Awaited<ReturnType<typeof fetchReviews>>
	>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (activeTeam?.id) {
			setIsLoading(true)
			fetchReviews(activeTeam.id)
				.then(setReviews)
				.finally(() => setIsLoading(false))
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

	if (isLoading) {
		return (
			<div className="space-y-8">
				<div className="grid gap-8 md:grid-cols-2">
					<Card>
						<div className="space-y-4 p-6">
							<Skeleton className="h-7 w-32" />
							<div className="flex items-center gap-4">
								<Skeleton className="h-10 w-10" />
								<div className="space-y-2">
									<Skeleton className="h-6 w-32" />
									<Skeleton className="h-4 w-24" />
								</div>
							</div>
						</div>
					</Card>
					<Card>
						<div className="space-y-4 p-6">
							<Skeleton className="h-7 w-32" />
							<div className="space-y-2">
								{Array.from({ length: 5 }).map((_, i) => (
									<div
										key={i}
										className="flex items-center gap-2"
									>
										<Skeleton className="h-4 w-4" />
										<Skeleton className="h-2 flex-1" />
										<Skeleton className="h-4 w-9" />
									</div>
								))}
							</div>
						</div>
					</Card>
				</div>
				<Card>
					<div className="space-y-6 p-6">
						<Skeleton className="h-7 w-40" />
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="space-y-4">
								<Skeleton className="h-px w-full" />
								<div className="flex gap-4">
									<Skeleton className="h-10 w-10 rounded-full" />
									<div className="flex-1 space-y-2">
										<div className="flex justify-between">
											<Skeleton className="h-5 w-32" />
											<div className="flex gap-2">
												<Skeleton className="h-5 w-28" />
												<Skeleton className="h-5 w-24" />
											</div>
										</div>
										<Skeleton className="h-4 w-3/4" />
									</div>
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>
		)
	}

	return (
		<div className="space-y-8">
			<ReviewStats reviews={reviews} />
			<ReviewList reviews={reviews} />
		</div>
	)
}

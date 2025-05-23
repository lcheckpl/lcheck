import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchReviews } from "@/lib/utils"
import { Rating, RatingButton } from "../ui/rating"

type ReviewStatsProps = {
	reviews: Awaited<ReturnType<typeof fetchReviews>>
}

export function ReviewStats({ reviews }: ReviewStatsProps) {
	const averageRating =
		reviews.length > 0
			? Math.round(
					reviews.reduce((sum, review) => sum + review.rating, 0) /
						reviews.length,
				)
			: 0

	const ratingDistribution = Array.from({ length: 5 }, (_, i) => i + 1).map(
		(rating) => ({
			rating,
			count: reviews.filter((review) => review.rating === rating).length,
			percentage:
				reviews.length > 0
					? Math.round(
							(reviews.filter(
								(review) => review.rating === rating,
							).length /
								reviews.length) *
								100,
						)
					: 0,
		}),
	)

	return (
		<div className="grid gap-8 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Średnia ocena</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-4">
						<div className="text-4xl font-bold">
							{averageRating}
						</div>
						<div>
							<Rating value={averageRating} readOnly>
								{Array.from({ length: 5 }).map((_, index) => (
									<RatingButton key={index} />
								))}
							</Rating>
							<p className="text-muted-foreground mt-1 text-sm">
								{reviews.length} opinii
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Rozkład ocen</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						{ratingDistribution.reverse().map((stat) => (
							<div
								key={stat.rating}
								className="flex items-center gap-2"
							>
								<div className="w-4 text-sm">{stat.rating}</div>
								<div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
									<div
										className="bg-primary h-full"
										style={{ width: `${stat.percentage}%` }}
									/>
								</div>
								<div className="text-muted-foreground w-9 text-sm">
									{stat.count}
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchReviews } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Rating, RatingButton } from "../ui/rating"
import { Separator } from "../ui/separator"

type ReviewListProps = {
	reviews: Awaited<ReturnType<typeof fetchReviews>>
}

export function ReviewList({ reviews }: ReviewListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Ostatnie opinie</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{reviews.map((review) => (
					<div key={review.id}>
						<Separator className="mb-6" />
						<div className="flex gap-4">
							<Avatar className="size-10">
								<AvatarImage
									src={review.user.image || ""}
									alt="Avatar"
								/>
								<AvatarFallback>?</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<div className="flex justify-between">
									<p className="font-semibold">
										{review.user.name}
									</p>
									<div className="flex items-center gap-2">
										<Rating value={review.rating} readOnly>
											{Array.from({ length: 5 }).map(
												(_, index) => (
													<RatingButton key={index} />
												),
											)}
										</Rating>
										<span className="text-muted-foreground">
											{review.createdAt.toLocaleDateString()}
										</span>
									</div>
								</div>
								<p className="text-muted-foreground mt-1">
									{review.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	)
}

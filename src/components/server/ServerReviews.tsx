import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { fetchServers } from "@/app/server/[slug]/page"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Fragment } from "react"
import { Separator } from "../ui/separator"
import { Rating, RatingButton } from "../ui/rating"

export default function ServerReviews({
	reviews,
}: {
	reviews: Awaited<ReturnType<typeof fetchServers>>
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Opinie użytkowników</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{reviews.map((review) => (
					<Fragment key={review.id}>
						<Separator />
						<div className="flex flex-row gap-4">
							<Avatar className="size-10">
								<AvatarImage
									src={review.user.image || ""}
									alt="Avatar"
								/>
								<AvatarFallback>?</AvatarFallback>
							</Avatar>
							<div className="w-full">
								<div className="flex flex-row justify-between">
									<p className="font-semibold">
										{review.user.name}
									</p>
									<div className="inline-flex gap-2">
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
								<p className="text-muted-foreground">
									{review.description}
								</p>
							</div>
						</div>
					</Fragment>
				))}
			</CardContent>
		</Card>
	)
}

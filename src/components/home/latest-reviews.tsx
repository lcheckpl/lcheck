import { prisma } from "@/lib/prisma"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card"
import { Separator } from "../ui/separator"
import { Rating, RatingButton } from "../ui/rating"
import { Button } from "../ui/button"
import Link from "next/link"

export default async function LatestReviews() {
	const reviews = await prisma.review.findMany({
		include: { user: true, server: true },
		take: 6,
		orderBy: {
			createdAt: "desc",
		},
	})
	return (
		<div className="flex flex-col gap-16">
			<h1>Najnowsze opinie</h1>
			<div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
				{reviews.map((review) => (
					<Card key={review.id}>
						<CardHeader className="flex flex-row items-center gap-4">
							<Avatar className="size-10">
								<AvatarImage
									src={`https://cdn.discordapp.com/icons/${review.server.id}/${review.server.icon}.png`}
									alt="Avatar"
								/>
								<AvatarFallback>?</AvatarFallback>
							</Avatar>
							<div className="space-y-1.5">
								<CardTitle>{review.server.name}</CardTitle>
								<CardDescription>
									{review.createdAt.toLocaleDateString()}
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent className="grow">
							<Rating value={review.rating} readOnly>
								{Array.from({ length: 5 }).map((_, index) => (
									<RatingButton key={index} />
								))}
							</Rating>
							<p className="text-muted-foreground">
								{review.description}
							</p>
						</CardContent>
						<Separator />
						<CardFooter className="justify-between">
							<p>Autor opini: {review.user.name}</p>
							<Link href={`/server/${review.serverId}`}>
								<Button>Profil serwera</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}

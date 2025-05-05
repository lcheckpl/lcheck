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

export default async function LatestReviews() {
	const reviews = await prisma.review.findMany({
		include: { user: true, server: true },
	})
	return (
		<div className="flex flex-col gap-16">
			<h1>Najnowsze recenzje</h1>
			<div className="grid grid-cols-3 gap-12">
				{reviews.map((review) => (
					<Card key={review.id}>
						<CardHeader>
							<Avatar>
								<AvatarImage
									src={review.user.image || ""}
									alt="Avatar"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<CardTitle>{review.user.name}</CardTitle>
							<CardDescription>
								{review.createdAt.toLocaleDateString()}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								{review.description}
							</p>
						</CardContent>
						<Separator />
						<CardFooter>
							<p>Serwer: {review.server.name}</p>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}

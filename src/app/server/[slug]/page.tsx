import ServerReviews from "@/components/server/ServerReviews"
import { SiteScaffold } from "@/components/shared/scaffold/site-scaffold"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Rating, RatingButton } from "@/components/ui/rating"
import { prisma } from "@/lib/prisma"
import { fetchServers } from "@/lib/utils"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function ServerPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const server = await prisma.serverCache.findFirst({
		where: { id: (await params).slug },
	})
	if (server == null) {
		notFound()
	}

	const reviews = await fetchServers(server.id)
	const avgReviews = reviews.length
		? Math.round(
				reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
			)
		: 0

	return (
		<SiteScaffold>
			<div className="flex flex-col gap-8">
				<Card>
					<CardHeader className="flex items-center gap-4">
						<Avatar className="size-10">
							<AvatarImage
								src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
								alt="Avatar"
							/>
							<AvatarFallback>?</AvatarFallback>
						</Avatar>

						<div className="space-y-1.5">
							<CardTitle>{server.name}</CardTitle>
							<CardDescription>{server.id}</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="inline-flex gap-2 text-lg">
							<Rating value={avgReviews} readOnly>
								{Array.from({ length: 5 }).map((_, index) => (
									<RatingButton key={index} />
								))}
							</Rating>
							({reviews.length})
						</div>
						<div className="flex flex-row gap-4">
							<Link href="/report">
								<Button>Wystaw opinie</Button>
							</Link>
							<Button variant="outline" disabled>
								Dołącz
							</Button>
						</div>
					</CardContent>
				</Card>
				<ServerReviews reviews={reviews} />
			</div>
		</SiteScaffold>
	)
}

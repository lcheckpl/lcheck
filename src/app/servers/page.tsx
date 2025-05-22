import { SiteScaffold } from "@/components/shared/scaffold/site-scaffold"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rating, RatingButton } from "@/components/ui/rating"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function ServersPage() {
	const servers = await prisma.serverCache.findMany({
		include: {
			Review: {
				select: {
					rating: true,
				},
			},
		},
		where: {
			Review: {
				some: {},
			},
		},
		orderBy: {
			name: "asc",
		},
	})

	return (
		<SiteScaffold>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold">Lista serwerów</h1>
					<p className="text-muted-foreground">
						Przeglądaj i oceniaj serwery Discord
					</p>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{servers.map((server) => {
						const avgRating = server.Review.length
							? server.Review.reduce(
									(sum, r) => sum + r.rating,
									0,
								) / server.Review.length
							: 0

						return (
							<Card key={server.id}>
								<CardHeader className="flex flex-row items-center gap-4">
									<Avatar className="size-10">
										<AvatarImage
											src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
											alt="Avatar"
										/>
										<AvatarFallback>?</AvatarFallback>
									</Avatar>
									<CardTitle>{server.name}</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="inline-flex gap-2">
										<Rating
											value={
												avgRating
													? Math.round(avgRating)
													: 0
											}
											readOnly
										>
											{Array.from({ length: 5 }).map(
												(_, index) => (
													<RatingButton key={index} />
												),
											)}
										</Rating>
										<span className="text-muted-foreground">
											(
											{server.Review.length
												? `${server.Review.length} ${server.Review.length === 1 ? "ocena" : server.Review.length < 5 ? "oceny" : "ocen"}`
												: "Brak ocen"}
											)
										</span>
									</div>
									<Link href={`/server/${server.id}`}>
										<Button className="w-full">
											Przejdź do serwera
										</Button>
									</Link>
								</CardContent>
							</Card>
						)
					})}
				</div>
			</div>
		</SiteScaffold>
	)
}

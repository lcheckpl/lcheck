import { SiteScaffold } from "@/components/shared/scaffold/site-scaffold"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
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
	return (
		<SiteScaffold>
			<Card>
				<CardHeader className="flex items-center">
					<Avatar>
						<AvatarImage
							src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
							alt="Avatar"
						/>
						<AvatarFallback>?</AvatarFallback>
					</Avatar>
					<CardTitle>{server.name}</CardTitle>
				</CardHeader>
			</Card>
		</SiteScaffold>
	)
}

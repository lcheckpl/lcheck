import { SiteScaffold } from "@/components/shared/scaffold/site-scaffold"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function ServerPage({
	params,
}: {
	params: { slug: string }
}) {
	const servers = await prisma.serverCache.findFirst({
		where: { id: params.slug },
	})
	if (servers == null) {
		notFound()
	}
	return <SiteScaffold>TODO</SiteScaffold>
}

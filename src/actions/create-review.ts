"use server"

import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { reportFormSchema } from "@/schema/report-schema"
import { z } from "zod"

export async function createReview(data: z.infer<typeof reportFormSchema>) {
	const session = await getSession()
	if (!session?.user) {
		return {
			error: true,
			message: "Musisz się zalogować",
		}
	}
	const result = reportFormSchema.safeParse(data)
	if (result.error) {
		return {
			error: true,
			message: result.error.message,
		}
	}

	try {
		await prisma.review.create({
			data: {
				serverId: result.data.serverId,
				rating: result.data.rating,
				description: result.data.description,
				userId: session.user.id,
			},
		})
	} catch {
		return {
			error: true,
			message: "Wystawiłeś już opinie temu serwerowi",
		}
	}
}

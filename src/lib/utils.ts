import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "./prisma"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function fetchServers(serverId: string) {
	return prisma.review.findMany({
		where: {
			serverId: serverId,
		},
		include: { user: true },
	})
}

"use server"

import { fetchReviews as fetchReviewsUtil } from "@/lib/utils"

export async function fetchReviews(serverId: string) {
	if (!serverId) {
		return []
	}
	return fetchReviewsUtil(serverId)
}

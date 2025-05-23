export interface IWebhookPayload {
	type: "review" | "test"
	serverId: string
	serverName: string
	rating?: number
	description?: string
}

export async function sendWebhook(url: string, payload: IWebhookPayload) {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		return {
			error: false,
			message: "Webhook wysłany pomyślnie",
		}
	} catch (error) {
		return {
			error: true,
			message: `Błąd podczas wysyłania webhooka: ${error instanceof Error ? error.message : "Nieznany błąd"}`,
		}
	}
}

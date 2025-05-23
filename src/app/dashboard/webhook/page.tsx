"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { getWebhook, setWebhook } from "@/actions/webhook"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { sendWebhook } from "@/lib/send-webhook"

const webhookFormSchema = z.object({
	webhookUrl: z.string().url("Nieprawidłowy adres URL"),
})

export default function WebhookPage() {
	const params = useParams()
	const serverId = params.serverId as string
	const [isTesting, setIsTesting] = useState(false)

	const form = useForm<z.infer<typeof webhookFormSchema>>({
		resolver: zodResolver(webhookFormSchema),
		defaultValues: {
			webhookUrl: "",
		},
	})

	useEffect(() => {
		getWebhook(serverId).then((result) => {
			if (!result.error && result.content) {
				form.setValue("webhookUrl", result.content)
			}
		})
	}, [])

	async function onSubmit(values: z.infer<typeof webhookFormSchema>) {
		const result = await setWebhook(serverId, values.webhookUrl)
		if (result.error) {
			form.setError("webhookUrl", {
				message: "Wystąpił błąd podczas zapisywania webhooka",
			})
		}
	}

	async function testWebhook() {
		setIsTesting(true)
		try {
			const webhookUrl = form.getValues("webhookUrl")
			if (!webhookUrl) {
				form.setError("webhookUrl", {
					message: "Wprowadź adres URL webhooka",
				})
				return
			}

			const result = await sendWebhook(webhookUrl, {
				type: "test",
				serverId: serverId,
				serverName: "Test Webhooka",
			})

			if (result.error) {
				form.setError("webhookUrl", {
					message: result.message,
				})
			}
		} finally {
			setIsTesting(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="webhookUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL Webhooka</FormLabel>
							<FormControl>
								<Input
									placeholder="https://discord.com/api/webhooks/..."
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Adres URL webhooka Discord, na który będą
								wysyłane powiadomienia o nowych opiniach
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-4">
					<Button
						type="submit"
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting && (
							<Loader2 className="mr-2 animate-spin" />
						)}
						{form.formState.isSubmitting ? "Zapisywanie" : "Zapisz"}
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={testWebhook}
						disabled={isTesting}
					>
						{isTesting && <Loader2 className="mr-2 animate-spin" />}
						{isTesting ? "Testowanie" : "Przetestuj"}
					</Button>
				</div>
			</form>
		</Form>
	)
}

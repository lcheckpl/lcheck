"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { reportFormSchema } from "@/schema/report-schema"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Rating, RatingButton } from "@/components/ui/rating"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { UserGuild } from "@/lib/fetch-guilds"
import { Loader2 } from "lucide-react"
import { createReview } from "@/actions/create-review"

export default function ReportForm({ servers }: { servers: UserGuild[] }) {
	async function onSubmit(values: z.infer<typeof reportFormSchema>) {
		const result = await createReview(values)
		if (result?.error == true) {
			form.setError("serverId", {
				message: result.message,
			})
			return
		}
		form.reset()
	}

	const form = useForm<z.infer<typeof reportFormSchema>>({
		resolver: zodResolver(reportFormSchema),
		defaultValues: {
			serverId: "",
			rating: 0,
			description: "",
		},
	})
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="serverId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Serwer</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value}
							>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Wybierz serwer z listy" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{servers.map((v) => (
										<SelectItem key={v.id} value={v.id}>
											{v.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								Serwer któremu chcesz wystawić opinie
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="rating"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ocena serwera</FormLabel>
							<FormControl>
								<Rating
									value={field.value}
									onValueChange={field.onChange}
								>
									{Array.from({ length: 5 }).map(
										(_, index) => (
											<RatingButton key={index} />
										),
									)}
								</Rating>
							</FormControl>
							<FormDescription>
								Oceń jakość usług oferowanych przez serwer
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Opis</FormLabel>
							<FormControl>
								<Input
									placeholder="Dlaczego taka ocena?"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Dodaj informacje, które mogą się przydać innym
								użytkownikom
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting && (
						<Loader2 className="animate-spin" />
					)}
					{form.formState.isSubmitting ? "Wysyłanie" : "Wyślij"}
				</Button>
			</form>
		</Form>
	)
}

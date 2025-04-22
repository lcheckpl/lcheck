import { z } from "zod"

export const reportFormSchema = z.object({
	serverId: z.string().nonempty({ message: "Wybierz serwer" }),
	rating: z
		.number()
		.min(1, { message: "Pole jest wymagane" })
		.max(5, { message: "Pole jest wymagane" }),
	description: z.string().min(20, {
		message: "Opis musi składać się z co najmniej 20 znaków.",
	}),
})

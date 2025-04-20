"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export default function LoginPage() {
	return (
		<Button
			onClick={() => {
				authClient.signIn.social({
					provider: "discord",
				})
			}}
		>
			Zaloguj się przez discorda
		</Button>
	)
}

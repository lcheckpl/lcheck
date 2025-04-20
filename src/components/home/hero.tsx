import { Button } from "@/components/ui/button"
import Image from "next/image"
export default function HeroSection() {
	return (
		<div className="flex flex-col items-center gap-24 lg:flex-row">
			<div className="flex flex-col gap-6">
				<h1>Zweryfikuj serwer, zanim coś kupisz!</h1>
				<p className="lead">
					Zanim dokonasz zakupu, upewnij się, że serwer, na którym
					chcesz kupować, jest naprawdę godny zaufania. Skorzystaj z
					lcheck.pl – to portal stworzony specjalnie po to, by pomóc
					Ci sprawdzić, czy dany serwer jest legitny i bezpieczny.
				</p>
				<div className="flex gap-4">
					<Button>Sprawdź serwer</Button>
					<Button variant="outline">Wystaw opinie</Button>
				</div>
			</div>
			<div>
				<Image
					src="placeholder.svg"
					alt="Hero image"
					width={1920}
					height={1080}
					className="aspect-video rounded-md"
				/>
			</div>
		</div>
	)
}

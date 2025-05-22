import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
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
					<Link href="/report">
						<Button>Wystaw opinie</Button>
					</Link>
					<Link href="https://discord.gg/BfH8xFUVNR" target="_blank">
						<Button variant="outline">Nasz serwer discord</Button>
					</Link>
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

import { prisma } from "@/lib/prisma"
import { polishPlurals } from "polish-plurals"
import { NumberTicker } from "../magicui/number-ticker"
import { InputIcon } from "@radix-ui/react-icons"
import { Code, MessageSquareMore, MonitorCog, ShieldCheck } from "lucide-react"
import { BentoGrid, BentoCard } from "../ui/bento-grid"

export default async function ReviewsStats() {
	const count = await prisma.review.count()
	const reviewForm = polishPlurals("opinia", "opinie", "opinii", count)
	const formIs = polishPlurals("jest", "są", "jest", count)

	const features = [
		{
			Icon: MonitorCog,
			name: "Zaawansowany dashboard",
			description: `Jesteś właścicielem serwera? 
			Udostępniamy Ci w pełni za darmo zaawansowany dashboard w którym możesz przeglądać statystyki, skonfigurować webhooka i wiele więcej`,
			href: "/",
			cta: "Learn more",
			background: <></>,
			className:
				"lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
		},
		{
			Icon: InputIcon,
			name: "Szanujemy twoje zdanie",
			description:
				"Masz prawo do wyrażenia swojej opinii na temat dowolnego serwera",
			href: "/",
			cta: "Learn more",
			background: <></>,

			className:
				"lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
		},
		{
			Icon: Code,
			name: "Open Source",
			description:
				"Kod jest dostępny na naszym githubie - każdy może przyczynić się do rozwoju strony poprzez pull request",
			href: "/",
			cta: "Learn more",
			background: <></>,

			className:
				"lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
		},
		{
			Icon: MessageSquareMore,
			name: "Support",
			description:
				"Oferujemy darmowe wsparcie techniczne, a jeśli znalazłeś błąd to cię nawet nagrodzimy",
			href: "/",
			cta: "Learn more",
			background: <></>,

			className:
				"lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
		},
		{
			Icon: ShieldCheck,
			name: "Bezpieczeństwo",
			description:
				"Każda zmieniona linijka w kodzie jest weryfikowana przez automatyczne systemy, a aktualizacje są dokładnie testowane",
			href: "/",
			cta: "Learn more",
			background: <></>,
			className:
				"lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
		},
	]

	return (
		<div className="flex flex-col gap-16">
			<h1>
				Na naszej stronie {formIs} już{" "}
				<NumberTicker
					value={count}
					className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
				/>{" "}
				{reviewForm}
			</h1>
			<BentoGrid className="lg:grid-rows-3">
				{features.map((feature) => (
					<BentoCard key={feature.name} {...feature} />
				))}
			</BentoGrid>
		</div>
	)
}

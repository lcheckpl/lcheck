import { prisma } from "@/lib/prisma"
import { polishPlurals } from "polish-plurals"
import { NumberTicker } from "../magicui/number-ticker"

export default async function ReviewsStats() {
	const count = await prisma.review.count()
	const reviewForm = polishPlurals("opinia", "opinie", "opinii", count)
	const formIs = polishPlurals("jest", "są", "jest", count)
	return (
		<h1>
			Na naszej stronie {formIs} już{" "}
			<NumberTicker
				value={count}
				className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
			/>{" "}
			{reviewForm}
		</h1>
	)
}

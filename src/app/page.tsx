import HeroSection from "@/components/home/hero"
import LatestReviews from "@/components/home/latest-reviews"
import { Navbar } from "@/components/shared/navigation/navbar"

export default function HomePage() {
	return (
		<div className="flex flex-col">
			<Navbar />
			<div className="p-6">
				<div className="flex flex-col gap-32">
					<HeroSection />
					<LatestReviews />
				</div>
			</div>
		</div>
	)
}

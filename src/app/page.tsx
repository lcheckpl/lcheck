import HeroSection from "@/components/home/hero"
import LatestReviews from "@/components/home/latest-reviews"

export default function Home() {
	return (
		<div className="flex flex-col gap-32">
			<HeroSection />
			<LatestReviews />
		</div>
	)
}

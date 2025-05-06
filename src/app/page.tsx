import HeroSection from "@/components/home/hero"
import LatestReviews from "@/components/home/latest-reviews"
import ReviewsStats from "@/components/home/reviews-stats"
import { SiteScaffold } from "@/components/shared/scaffold/site-scaffold"

export default function HomePage() {
	return (
		<SiteScaffold>
			<div className="flex flex-col gap-32">
				<HeroSection />
				<LatestReviews />
				<ReviewsStats />
			</div>
		</SiteScaffold>
	)
}

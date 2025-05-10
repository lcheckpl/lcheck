import { DiscordIcon } from "@/components/ui/icons"
import { Navbar1 } from "@/components/ui/navbar-top"
import { Separator } from "@/components/ui/separator"
import { Book, Trees, Zap, Star, Handshake } from "lucide-react"
import { ReactNode } from "react"

export function SiteScaffold({ children }: { children: ReactNode }) {
	const navbarData = {
		logo: {
			url: "/",
			src: "/logo.webp",
			alt: "lcheck.pl",
			title: "lcheck.pl",
		},
		menu: [
			{
				title: "Strona główna",
				url: "/",
			},
			{
				title: "Społeczność",
				url: "#",
				items: [
					{
						title: "Opinie",
						description: "Wszystkie opinie wystawione przez was",
						icon: <Star className="size-5 shrink-0" />,
						url: "/reviewsX",
					},
					{
						title: "Discord",
						description:
							"Nasz serwer discord na którym możesz uzyskać pomoc",
						icon: <DiscordIcon className="size-5 shrink-0" />,
						url: "/discord",
					},
					{
						title: "Dołącz do nas",
						description:
							"Aktywnie szukamy ludzi, którzy są w stanie nam pomóc w prowadzeniu strony",
						icon: <Handshake className="size-5 shrink-0" />,
						url: "/careers",
					},
					{
						title: "Blog",
						description:
							"Regularnie wrzucamy tutaj informacje o aktualizacjach na stronie",
						icon: <Book className="size-5 shrink-0" />,
						url: "/blog",
					},
				],
			},
			{
				title: "Zasoby",
				url: "#",
				items: [
					{
						title: "Centrum Pomocy",
						description: "TODO bo nie mam pomysłu",
						icon: <Zap className="size-5 shrink-0" />,
						url: "/help",
					},
					{
						title: "Status",
						description: "Sprawdź status naszych systemów",
						icon: <Trees className="size-5 shrink-0" />,
						url: "/status",
					},
					{
						title: "Regulamin i polityka prywatności",
						description: "w sumie nie wiem czy to dodam wiec TODO",
						icon: <Book className="size-5 shrink-0" />,
						url: "/terms",
					},
				],
			},
			{
				title: "Blog",
				url: "/blog",
			},
		],
		mobileExtraLinks: [
			{ name: "Press", url: "/press" },
			{ name: "Contact", url: "/contact" },
			{ name: "Imprint", url: "/imprint" },
			{ name: "Sitemap", url: "/sitemap" },
		],
		auth: {
			login: { text: "Panel", url: "/dashboard" },
			signup: { text: "Wystaw opinie", url: "/report" },
		},
	}

	return (
		<div className="flex min-h-screen flex-col">
			<div className="sticky top-0 z-50">
				<Navbar1 {...navbarData} />
				<Separator className="sticky top-0" />
			</div>
			<div className="grow p-6 py-24">{children}</div>
		</div>
	)
}

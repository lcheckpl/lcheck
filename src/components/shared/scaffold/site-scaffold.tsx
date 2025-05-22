import { DiscordIcon } from "@/components/ui/icons"
import { Navbar1 } from "@/components/ui/navbar-top"
import { Separator } from "@/components/ui/separator"
import { Handshake } from "lucide-react"
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
			{ title: "Strona główna", url: "/" },
			{
				title: "Serwery",
				url: "/servers",
			},
			{
				title: "Społeczność",
				url: "#",
				items: [
					{
						title: "Discord",
						description:
							"Nasz serwer discord na którym możesz uzyskać pomoc",
						icon: <DiscordIcon className="size-5 shrink-0" />,
						url: "https://discord.gg/BfH8xFUVNR",
						externalURL: true,
					},
					{
						title: "GitHub",
						description: "Nasze repozytorium na GitHubie",
						icon: <Handshake className="size-5 shrink-0" />,
						url: "https://github.com/lcheckpl/lcheck",
						externalURL: true,
					},
				],
			},
		],
		mobileExtraLinks: [],
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

import { Book, Menu, Sunset, Trees, Zap } from "lucide-react"

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { JSX } from "react"
import Image from "next/image"
import Link from "next/link"

interface MenuItem {
	title: string
	url: string
	description?: string
	icon?: JSX.Element
	items?: MenuItem[]
}

interface Navbar1Props {
	logo?: {
		url: string
		src: string
		alt: string
		title: string
	}
	menu?: MenuItem[]
	mobileExtraLinks?: {
		name: string
		url: string
	}[]
	auth?: {
		login: {
			text: string
			url: string
		}
		signup: {
			text: string
			url: string
		}
	}
}

const Navbar1 = ({
	logo = {
		url: "https://www.shadcnblocks.com",
		src: "https://www.shadcnblocks.com/images/block/block-1.svg",
		alt: "logo",
		title: "Shadcnblocks.com",
	},
	menu = [
		{ title: "Home", url: "#" },
		{
			title: "Products",
			url: "#",
			items: [
				{
					title: "Blog",
					description: "The latest industry news, updates, and info",
					icon: <Book className="size-5 shrink-0" />,
					url: "#",
				},
				{
					title: "Company",
					description:
						"Our mission is to innovate and empower the world",
					icon: <Trees className="size-5 shrink-0" />,
					url: "#",
				},
				{
					title: "Careers",
					description:
						"Browse job listing and discover our workspace",
					icon: <Sunset className="size-5 shrink-0" />,
					url: "#",
				},
				{
					title: "Support",
					description:
						"Get in touch with our support team or visit our community forums",
					icon: <Zap className="size-5 shrink-0" />,
					url: "#",
				},
			],
		},
		{
			title: "Resources",
			url: "#",
			items: [
				{
					title: "Help Center",
					description: "Get all the answers you need right here",
					icon: <Zap className="size-5 shrink-0" />,
					url: "#",
				},
				{
					title: "Contact Us",
					description:
						"We are here to help you with any questions you have",
					icon: <Sunset className="size-5 shrink-0" />,
					url: "#",
				},
				{
					title: "Status",
					description:
						"Check the current status of our services and APIs",
					icon: <Trees className="size-5 shrink-0" />,
					url: "#",
				},
				{
					title: "Terms of Service",
					description:
						"Our terms and conditions for using our services",
					icon: <Book className="size-5 shrink-0" />,
					url: "#",
				},
			],
		},
		{
			title: "Pricing",
			url: "#",
		},
		{
			title: "Blog",
			url: "#",
		},
	],
	mobileExtraLinks = [
		{ name: "Press", url: "#" },
		{ name: "Contact", url: "#" },
		{ name: "Imprint", url: "#" },
		{ name: "Sitemap", url: "#" },
	],
	auth = {
		login: { text: "Log in", url: "#" },
		signup: { text: "Sign up", url: "#" },
	},
}: Navbar1Props) => {
	return (
		<section className="bg-background p-4">
			<div className="container">
				<nav className="hidden justify-between lg:flex">
					<div className="flex items-center gap-6">
						<Link
							href={logo.url}
							className="flex items-center gap-2"
						>
							<Image
								src={logo.src}
								className="w-8"
								width={200}
								height={200}
								alt={logo.alt}
							/>
							<span className="text-lg font-semibold">
								{logo.title}
							</span>
						</Link>
						<div className="flex items-center">
							<NavigationMenu>
								<NavigationMenuList>
									{menu.map((item) => renderMenuItem(item))}
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>
					<div className="flex gap-2">
						<Button asChild variant="outline" size="sm">
							<Link href={auth.login.url}>{auth.login.text}</Link>
						</Button>
						<Button asChild size="sm">
							<Link href={auth.signup.url}>
								{auth.signup.text}
							</Link>
						</Button>
					</div>
				</nav>
				<div className="block lg:hidden">
					<div className="flex items-center justify-between">
						<Link
							href={logo.url}
							className="flex items-center gap-2"
						>
							<Image
								src={logo.src}
								className="w-8"
								width={200}
								height={200}
								alt={logo.alt}
							/>
							<span className="text-lg font-semibold">
								{logo.title}
							</span>
						</Link>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline" size="icon">
									<Menu className="size-4" />
								</Button>
							</SheetTrigger>
							<SheetContent className="overflow-y-auto p-6">
								<SheetHeader>
									<SheetTitle>
										<Link
											href={logo.url}
											className="flex items-center gap-2"
										>
											<Image
												src={logo.src}
												className="w-8"
												width={200}
												height={200}
												alt={logo.alt}
											/>
											<span className="text-lg font-semibold">
												{logo.title}
											</span>
										</Link>
									</SheetTitle>
								</SheetHeader>
								<div className="my-6 flex flex-col gap-6">
									<Accordion
										type="single"
										collapsible
										className="flex w-full flex-col gap-4"
									>
										{menu.map((item) =>
											renderMobileMenuItem(item),
										)}
									</Accordion>
									<div className="border-t py-4">
										<div className="grid grid-cols-2 justify-start">
											{mobileExtraLinks.map(
												(link, idx) => (
													<Link
														key={idx}
														className="text-muted-foreground hover:bg-muted hover:text-accent-foreground inline-flex h-10 items-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors"
														href={link.url}
													>
														{link.name}
													</Link>
												),
											)}
										</div>
									</div>
									<div className="flex flex-col gap-3">
										<Button asChild variant="outline">
											<Link href={auth.login.url}>
												{auth.login.text}
											</Link>
										</Button>
										<Button asChild>
											<Link href={auth.signup.url}>
												{auth.signup.text}
											</Link>
										</Button>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</section>
	)
}

const renderMenuItem = (item: MenuItem) => {
	if (item.items) {
		return (
			<NavigationMenuItem
				key={item.title}
				className="text-muted-foreground"
			>
				<NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
				<NavigationMenuContent>
					<ul className="w-80 p-3">
						{item.items.map((subItem) => (
							<li key={subItem.title}>
								<Link
									className="hover:bg-muted hover:text-accent-foreground flex gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
									href={subItem.url}
								>
									{subItem.icon}
									<div>
										<div className="text-sm font-semibold">
											{subItem.title}
										</div>
										{subItem.description && (
											<p className="text-muted-foreground text-sm leading-snug">
												{subItem.description}
											</p>
										)}
									</div>
								</Link>
							</li>
						))}
					</ul>
				</NavigationMenuContent>
			</NavigationMenuItem>
		)
	}

	return (
		<Link
			key={item.title}
			className="group bg-background text-muted-foreground hover:bg-muted hover:text-accent-foreground inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
			href={item.url}
		>
			{item.title}
		</Link>
	)
}

const renderMobileMenuItem = (item: MenuItem) => {
	if (item.items) {
		return (
			<AccordionItem
				key={item.title}
				value={item.title}
				className="border-b-0"
			>
				<AccordionTrigger className="py-0 font-semibold hover:no-underline">
					{item.title}
				</AccordionTrigger>
				<AccordionContent className="mt-2">
					{item.items.map((subItem) => (
						<Link
							key={subItem.title}
							className="hover:bg-muted hover:text-accent-foreground flex gap-4 rounded-md p-3 leading-none transition-colors outline-none select-none"
							href={subItem.url}
						>
							{subItem.icon}
							<div>
								<div className="text-sm font-semibold">
									{subItem.title}
								</div>
								{subItem.description && (
									<p className="text-muted-foreground text-sm leading-snug">
										{subItem.description}
									</p>
								)}
							</div>
						</Link>
					))}
				</AccordionContent>
			</AccordionItem>
		)
	}

	return (
		<Link key={item.title} href={item.url} className="font-semibold">
			{item.title}
		</Link>
	)
}

export { Navbar1 }

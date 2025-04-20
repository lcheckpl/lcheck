"use client"

import * as React from "react"

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
	return (
		<NavigationMenu className="mx-auto p-4">
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Navbar TODO</NavigationMenuTrigger>
					<NavigationMenuContent>
						<NavigationMenuLink>Link</NavigationMenuLink>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
			<Link href="/dashboard">
				<Button>Panel</Button>
			</Link>
		</NavigationMenu>
	)
}

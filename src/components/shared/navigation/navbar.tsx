"use client"

import * as React from "react"

import { NavBar } from "@/components/ui/tubelight-navbar"
import { Home, User, Briefcase, FileText } from "lucide-react"

export function Navbar() {
	const navItems = [
		{ name: "Home", url: "/", icon: Home },
		{ name: "Nowe zgłoszenie", url: "report", icon: User },
		{ name: "Projects", url: "#", icon: Briefcase },
		{ name: "Resume", url: "#", icon: FileText },
	]
	return <NavBar items={navItems} />
}

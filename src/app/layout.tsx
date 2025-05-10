import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "lcheck.pl",
	description:
		"Portal lcheck.pl to open sourceowy portlal do wystawiania opini serwerom discord",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pl">
			<body
				className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
			>
				{children}
			</body>
		</html>
	)
}

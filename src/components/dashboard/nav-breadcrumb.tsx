"use client"
import { usePathname } from "next/navigation"
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "../ui/breadcrumb"
import { Fragment } from "react"

export default function NavBreadcrumb() {
	const path = usePathname().split("/")
	path.shift()
	const pathnames: Record<string, string> = {
		dashboard: "Panel",
		reviews: "Opinie",
		manage: "Zarządzanie",
		logs: "Logi",
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{path.map((pathItem, index, array) => (
					<Fragment key={index}>
						{array[index + 1] != null ? (
							<>
								<BreadcrumbItem className="hidden capitalize md:block">
									<BreadcrumbLink href={""}>
										{pathnames[pathItem] || pathItem}
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
							</>
						) : (
							<BreadcrumbItem className="hidden capitalize md:block">
								<BreadcrumbPage>
									{pathnames[pathItem] || pathItem}
								</BreadcrumbPage>
							</BreadcrumbItem>
						)}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

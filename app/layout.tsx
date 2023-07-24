import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextProvider from "@/components/NextProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "RedditC",
	description: "Reddit clone",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={cn("pt-10 px-10", inter.className)}>
				<NextProvider>
					<Navbar />
					<div className="pt-10">{children}</div>
				</NextProvider>
			</body>
		</html>
	);
}

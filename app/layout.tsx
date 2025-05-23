import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Header/Nav";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SeoHead from "@/components/SeoHead";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    openGraph: {
        url: "https://jv3.vercel.app/",
        siteName: "Jarek Olszewski - Fotograf",
        locale: "pl_PL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Fotograf Siedlce: Fotografia Ślubna i Artystyczna, Foto",
        description:
            "Fotograf Siedlce: Jarek Olszewski fotografia ślubna i reportaże. Najlepszy fotograf ślubny w Siedlcach. Zobacz portfolio i zamów sesję!",
        images: ["/Images/fotograf-siedlce-jarek-olszewski.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl">
            <head>
                <SeoHead />
            </head>
            <body
                className={`flex flex-col min-h-screen w-full font-light antialiased ${geistSans.className}`}
            >
                {/* <IntroOverlay /> */}
                <Nav />
                <main className="flex-1 w-full overflow-x-hidden relative min-h-[90vh]">
                    {children}
                </main>
                <ScrollToTopButton />
                <Footer />
            </body>
        </html>
    );
}

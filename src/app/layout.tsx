import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import VhFixer from "@/components/VhFixer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const cabinetGrotesk = localFont({
    src: [
        // Thin (100)
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Thin.woff2",
            style: "normal",
            weight: "100",
        },
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Thin.woff",
            style: "normal",
            weight: "100",
        },
        // Extralight (200)
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Extralight.woff2",
            style: "normal",
            weight: "200",
        },
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Extralight.woff",
            style: "normal",
            weight: "200",
        },
        // Light (300)
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Light.woff2",
            style: "normal",
            weight: "300",
        },
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Light.woff",
            style: "normal",
            weight: "300",
        },
        // Regular (400)
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Regular.woff2",
            style: "normal",
            weight: "400",
        },
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Regular.woff",
            style: "normal",
            weight: "400",
        },
        // Medium (500)
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Medium.woff2",
            style: "normal",
            weight: "500",
        },
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Medium.woff",
            style: "normal",
            weight: "500",
        },
        // Bold (700)
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Bold.woff2",
            style: "normal",
            weight: "700",
        },
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Bold.woff",
            style: "normal",
            weight: "700",
        },
        // Extrabold (800)
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Extrabold.woff2",
            style: "normal",
            weight: "800",
        },
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Extrabold.woff",
            style: "normal",
            weight: "800",
        },
        // Black (900)
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Black.woff2",
            style: "normal",
            weight: "900",
        },
        {
            path: "../../public/fonts/Cabinet-Grotesk/CabinetGrotesk-Black.woff",
            style: "normal",
            weight: "900",
        },
    ],
    variable: "--font-cabinet",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Eleven Fantasy",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${cabinetGrotesk.variable} antialiased`}
            >
                <div className="w-full lg:w-[450px] bg-[#fcfcfc]  h-[calc(var(--vh)*100)] relative mx-auto">
                    <VhFixer />
                    {children}
                </div>
            </body>
        </html>
    );
}

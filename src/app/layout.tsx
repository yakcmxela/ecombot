import type { Metadata } from "next";
import { Montserrat, Cinzel_Decorative } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import classNames from "classnames";
import "./globals.css";

const Cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
});

const Mont = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Clawde Chatbot",
  description: "Chat With Clawde",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics/>
      <body
        className={classNames(
          Cinzel.className,
          Cinzel.variable,
          Mont.className,
          Mont.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}

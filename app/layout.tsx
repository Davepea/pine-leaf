import type { Metadata } from "next";
import { Lato, Roboto } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper"; // make sure this path is correct

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: "700",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pineleaf-Home page",
  description: "Building Legacies, one Property at a Time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${roboto.variable} antialiased`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "./providers";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export const metadata: Metadata = {
  title: "Онконастороженность",
  description: "Информационный портал о онкологических заболеваниях",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <div className="flex min-h-screen w-full flex-1 flex-col">
          <Providers>
            <Header />
            <main className="h-full flex-1 pt-16">{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}

import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "./providers";
import Header from "~/components/Header";

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
        <div className="min-h-screen w-full bg-gradient-to-b from-[#fff] to-[#ff3c0028]">
          <Providers>
            <Header />
            <main className="flex w-full flex-col items-center">
              {children}
            </main>
          </Providers>
        </div>
      </body>
    </html>
  );
}

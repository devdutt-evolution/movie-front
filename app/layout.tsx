import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import mobileFooter from "@/public/mobile-bottom-shape.svg";
import Footer from "@/public/bottom-shape.svg";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie List",
  description: "Movie list",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-back relative`}>
        {children}
        <footer className="absolute bottom-0 left-0 w-full z-[-1]">
          <figure>
            <Image
              width={30}
              height={3}
              src={mobileFooter}
              className="w-full md:invisible"
              alt="large footer"
            />
            <Image
              width={30}
              height={3}
              src={Footer}
              className="invisible w-0 md:w-full md:visible"
              alt="mobile footer"
            />
          </figure>
        </footer>
      </body>
    </html>
  );
}

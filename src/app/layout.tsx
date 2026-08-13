import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});


export const metadata: Metadata = {
  title: "My daily Yield",
  description: "It is a Personal Project that I`m going to use on my daily routine as an investor.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", geist.variable)}
    >
      <body className={`${poppins.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}

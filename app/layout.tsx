import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Showrt",
  description: "Generate redirect link",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={font.className}>   
      <div className="h-full [background:radial-gradient(160%_125%_at_50%_10%,#000_40%,#13e_100%)]"><MaxWidthWrapper>{children}</MaxWidthWrapper> </div>
     </body>
    </html>
    </ClerkProvider>
  );
}

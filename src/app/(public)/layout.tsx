import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    template: '%s | Brazilian Network',
    default: 'Brazilian Network | Comuniade Imigrantes',
  },
  description: "Comunidade Imigrantes",
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR"  style={{paddingTop:0,marginTop:0, boxSizing: 'border-box'}}>

      <body className={inter.className}>
        <main>{children}</main>
      <Toaster />
        </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from '@/utils/SessionProvider';
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
        <body className={inter.className}>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const jakarta = Plus_Jakarta_Sans({
  weight: ['200', '300', '400', '500', '600', '700' , '800'],
  subsets: ['latin']
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NexLearn",
  description: "Non stop learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={jakarta.className}
      >
        {children}
      </body>
    </html>
  );
}

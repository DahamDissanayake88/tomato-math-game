import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tomato Math Game | Enhanced Educational Puzzle",
  description: "An enhanced mathematical puzzle game powered by Next.js and the Banana API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trivia Blitz",
  description: "Test your knowledge across different categories!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

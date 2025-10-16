import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Survey App",
  description: "A static survey and stats app with chat demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

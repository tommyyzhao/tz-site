import "./globals.css";
import type { Metadata } from "next";
import Background from "../components/Background";

export const metadata: Metadata = {
  title: "Thomas Zhao",
  description: "Thomas Zhao's personal website",
  icons: { icon: "/favicon.ico" },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Background />
        {children}
      </body>
    </html>
  );
}

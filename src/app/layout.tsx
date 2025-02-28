import type { Metadata } from "next";
import "./globals.css";
import AccessibilityMenu from "@/components/ui/AccessibilityMenu";

export const metadata: Metadata = {
  title: "Gallery AI",
  description: "Gallery AI for the visually impaired",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AccessibilityMenu />
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}

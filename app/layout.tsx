import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jaspreet Singh | 3D Portfolio",
  description:
    "Award-winning cinematic 3D portfolio of Jaspreet Singh — Website Designer, UI/UX Designer, Graphic Designer, Video Editor & Full Stack Developer.",
  keywords: [
    "Jaspreet Singh",
    "Portfolio",
    "Web Designer",
    "UI/UX",
    "Three.js",
    "Full Stack Developer",
  ],
  openGraph: {
    title: "Jaspreet Singh | 3D Portfolio",
    description:
      "A cinematic 3D snake-guided portfolio experience by Jaspreet Singh.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#04060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

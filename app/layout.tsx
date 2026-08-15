import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:5173";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "BAIRE Research Commons",
    description: "A Bangladesh-centered global research network for people, projects, data, learning, and discovery.",
    openGraph: {
      title: "BAIRE Research Commons",
      description: "Research without borders. Progress without restarting.",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "BAIRE Research Commons" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "BAIRE Research Commons",
      description: "Research without borders. Progress without restarting.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

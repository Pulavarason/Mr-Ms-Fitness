import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Gym in ${site.locality}, ${site.city}`,
  description: `Strength. Discipline. Transformation. ${site.name} is a unisex gym in ${site.locality}, ${site.city}. Explore training programs and membership plans.`,
  openGraph: {
    title: `${site.name}`,
    description: "Forge your stronger self. Unisex fitness studio in Mugalivakkam, Chennai.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/brand/logo.png", width: 606, height: 309, alt: site.name }],
  },
  icons: { icon: "/brand/logo-mark.png" },
};

export const viewport: Viewport = { themeColor: "#080808", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: site.name,
  image: `${site.url}/brand/logo.png`,
  address: { "@type": "PostalAddress", addressLocality: site.locality + ", " + site.city, addressCountry: "IN", ...(site.address ? { streetAddress: site.address } : {}) },
  ...(site.phone ? { telephone: `+${site.phone}` } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}

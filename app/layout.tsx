import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Antonio, Schibsted_Grotesk } from "next/font/google";
import { content } from "@/data/content";

// Fonts
const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-antonio",
  display: "swap",
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted-grotesk",
  display: "swap",
});

// Generate dynamic SEO metadata
const generateMetadata = (): Metadata => {
  const { biodata, hero, tentangKami, navbar } = content;
  const siteName = biodata.namaBrand;
  const slogan = tentangKami.slogan;
  const productName = hero.produkTerlaris.nama;
  const description =
    tentangKami.keunggulan || `${productName} - ${tentangKami.slogan}`;
  const shortDescription =
    description.length > 160
      ? `${description.substring(0, 157)}...`
      : description;

  // Generate keywords from content
  const keywords = [
    productName.toLowerCase(),
    siteName.toLowerCase(),
    tentangKami.slogan.toLowerCase(),
    "makanan dan minuman enak",
    "delivery order",
    "pesan online",
    content.kontak.lokasi.kota.toLowerCase() || "indonesia",
    ...(tentangKami.poinKeunggulan?.map((poin) =>
      poin.toLowerCase().split(" ").slice(0, 3).join(" "),
    ) || []),
  ]
    .filter(Boolean)
    .join(", ");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";
  const logoUrl = navbar.logo?.startsWith("http")
    ? navbar.logo
    : `${baseUrl}${navbar.logo || "/images/logo.png"}`;

  return {
    title: {
      default: `${siteName} - ${slogan}`,
      template: `%s | ${siteName}`,
    },
    description: shortDescription,
    keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,

    // Open Graph
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: baseUrl,
      siteName,
      title: `${siteName} - ${slogan}`,
      description: shortDescription,
      images: [
        {
          url: hero.produkTerlaris.hero || logoUrl,
          width: 1200,
          height: 630,
          alt: `${productName} - ${siteName}`,
        },
        {
          url: logoUrl,
          width: 800,
          height: 600,
          alt: `Logo ${siteName}`,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: `${siteName} - ${slogan}`,
      description: shortDescription,
      images: [hero.produkTerlaris.hero || logoUrl],
      creator: `@${siteName.toLowerCase().replace(/\s+/g, "")}`,
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Icons
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/images/logo.svg", type: "image/svg+xml" },
        { url: "/images/logo.png", type: "image/png" },
      ],
      apple: [{ url: "/images/logo.svg", sizes: "180x180" }],
      shortcut: "/images/logo.svg",
    },

    // Manifest
    manifest: "/manifest.json",

    // Additional tags
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
    },

    // Category
    category: "makanan dan minuman",
  };
};

// Export metadata
export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${antonio.variable} ${schibstedGrotesk.variable} overflow-x-hidden antialiased`}
    >
      <head>
        {/* Preconnect untuk performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch untuk external resources */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />

        {/* Viewport meta tag untuk responsive */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Additional SEO tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#f59e0b" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: content.biodata.namaBrand,
              description: content.tentangKami.keunggulan,
              url: process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000",
              logo: content.navbar.logo,
              image: content.hero.produkTerlaris.hero,
              telephone: content.navbar.noWaUsaha,
              servesCuisine: "Indonesian",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressLocality:
                  content.kontak?.lokasi?.kota ||
                  content.kontak.lokasi.provinsi,
                addressRegion: content.kontak?.lokasi?.provinsi || "Indonesia",
                addressCountry: "ID",
              },
              openingHours: `${content.navbar.hariOperasional} ${content.navbar.jamOperasional}`,
              hasMenu: {
                "@type": "Menu",
                hasMenuSection: {
                  "@type": "MenuSection",
                  name: "Menu Utama",
                  hasMenuItem:
                    content.produk?.map((item) => ({
                      "@type": "MenuItem",
                      name: item.nama,
                      description: `${item.nama} dengan rating ${item.rating} bintang`,
                      offers: {
                        "@type": "Offer",
                        price: item.harga,
                        priceCurrency: "IDR",
                      },
                    })) || [],
                },
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { TopNav } from "@/components/layout/TopNav";

export const metadata: Metadata = {
  title: {
    default: "Dynamics Academy",
    template: "%s | Dynamics Academy",
  },
  description:
    "Comprehensive Microsoft Dynamics 365 documentation — covering Power Platform, Dataverse, JavaScript, Plugins, PCF, Azure Integration, ALM, and more.",
  keywords: [
    "Dynamics 365",
    "Microsoft Dynamics",
    "Power Platform",
    "Dataverse",
    "CRM",
    "ERP",
    "documentation",
  ],
  authors: [{ name: "Dynamics Academy" }],
  openGraph: {
    title: "Dynamics Academy",
    description: "Comprehensive Microsoft Dynamics 365 documentation and learning resource.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground min-h-screen antialiased">
        <ThemeProvider>
          <TopNav />
          <div className="flex pt-16 min-h-screen">
            <main className="flex-1 w-full">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

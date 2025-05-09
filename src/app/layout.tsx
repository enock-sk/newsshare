import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Media News Portal",
  description: "Submit and manage news articles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-secondary min-h-screen">
        <header className="bg-primary text-white p-6 text-center shadow-md">
          <h1 className="text-4xl font-bold">Media News Portal</h1>
          <p className="mt-2 text-lg">Submit and Review News Articles</p>
        </header>
        {children}
      </body>
    </html>
  );
}

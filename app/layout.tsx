import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Finder",
  description: "Find and save your favorite recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full`}>
        <nav className="bg-white border-b border-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-2 py-2 text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  <span className="text-xl font-bold">Recipe Finder</span>
                </Link>
              </div>
              <div className="flex items-center">
                <Link
                  href="/favorites"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-indigo-600 hover:text-indigo-500 hover:bg-indigo-50 transition-all duration-200"
                >
                  <HeartIcon className="w-5 h-5" />
                  <span className="font-medium">Favorites</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </body>
    </html>
  );
}

import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FishNet",
  description: "E-commerce de peixes ornamentais.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className + " h-screen"}>
        <Suspense>
          <main className="relative min-h-[calc(100%-4rem)] bg-blue-dark text-stone-800">
            {children}
          </main>
        </Suspense>
      </body>
    </html>
  );
}

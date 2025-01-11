import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FishNet",
  description: "E-commerce de peixes ornamentais.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className + " h-screen"}>
        <main className="relative min-h-[calc(100%-4rem)] bg-blue-dark text-stone-800">
          {children}
        </main>
      </body>
    </html>
  );
}

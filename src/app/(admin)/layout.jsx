"use client";

import "@/app/globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import Header from "../components/admin/Header";
import NavBar from "../components/admin/NavBar";
import { useAuth } from "../lib/auth";
import { ProfileContext, TitleContext } from "../lib/stores";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "FishNet | Admin",
//   description: "Sistema de gerenciamento de vendas de peixes ornamentais.",
// };

export default function RootLayout({ children }) {
  useAuth(null, true);
  
  const [title, setTitle] = useState("");
  const [profile, setProfile] = useState({ name: "", picture: "" });
  const escapeLayout = title === null;

  return (
    <html lang="pt-br">
      <body className={inter.className + " h-screen"}>
        <TitleContext.Provider value={setTitle}>
          <ProfileContext.Provider value={setProfile}>
            <div className="bg-gray-light flex min-h-[100vh] items-stretch">
              {escapeLayout || <NavBar />}
              <div className="flex-1">
                {escapeLayout || <Header title={title} profile={profile} />}
                <main className={escapeLayout ? "" : "mx-7"}>{children}</main>
              </div>
            </div>
          </ProfileContext.Provider>
        </TitleContext.Provider>
      </body>
    </html>
  );
}

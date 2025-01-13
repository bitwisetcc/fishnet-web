"use client";

import "@/app/globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import Header from "../components/admin/Header";
import NavBar from "../components/admin/NavBar";
import { ProfileContext, SideBarContext, TitleContext } from "../lib/stores";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, sidebar }) {
  // useAuth(null, false);

  const [title, setTitle] = useState("");
  const [profile, setProfile] = useState({ name: "", picture: "" });
  const sideBarStateCouple = useState({});

  return (
    <html lang="pt-br">
      <body className={`${inter.className} drawer drawer-end h-screen`}>
        <input type="checkbox" id="filter-sidebar" className="drawer-toggle" />

        <div className="drawer-content flex min-h-[100vh] items-stretch bg-gray-light text-stone-800">
          <TitleContext.Provider value={setTitle}>
            <ProfileContext.Provider value={setProfile}>
              <NavBar />
              <div className="flex-1">
                <Header title={title} profile={profile} />
                <main className="mx-7">{children}</main>
              </div>
            </ProfileContext.Provider>
          </TitleContext.Provider>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="filter-sidebar"
            aria-label="close sidebar"
            className="drawer-overlay bg-transparent"
          ></label>
          <div className="h-full p-4">
              <SideBarContext.Provider value={sideBarStateCouple}>
                {sidebar}
              </SideBarContext.Provider>
          </div>
        </div>
      </body>
    </html>
  );
}

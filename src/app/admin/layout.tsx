"use client";

import "@/app/globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import Header from "./components/layout/Header";
import NavBar from "./components/layout/NavBar";
import { ProfileContext, SideBarContext, TitleContext } from "../lib/stores";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, sidebar }) {
  // useAuth(null, false);

  const [title, setTitle] = useState("");
  const [profile, setProfile] = useState({ name: "", picture: "" });
  const sideBarStateCouple = useState({});

  return (
    <html lang="pt-br">
      <body className={`${inter.className} drawer drawer-open`}>
        <TitleContext.Provider value={setTitle}>
          <ProfileContext.Provider value={setProfile}>
            <input
              type="checkbox"
              id="navbar-toggle"
              className="drawer-toggle"
            />

            <nav className="drawer-side">
              <label
                htmlFor="navbar-toggle"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <NavBar />
            </nav>

            <div className="drawer-content">
              <SideBarContext.Provider value={sideBarStateCouple}>
                <div className="drawer drawer-end min-h-full bg-base-100 text-stone-800">
                  <input
                    type="checkbox"
                    id="sidebar-toggle"
                    className="drawer-toggle"
                  />

                  <div className="drawer-content *:h-max">
                    <Header title={title} profile={profile} />
                    <main className="mx-7 mb-5">{children}</main>
                  </div>

                  <div className="drawer-side">
                    <label
                      htmlFor="sidebar-toggle"
                      aria-label="close sidebar"
                      className="drawer-overlay bg-transparent"
                    ></label>
                    <div className="h-full p-4">{sidebar}</div>
                  </div>
                </div>
              </SideBarContext.Provider>
            </div>
          </ProfileContext.Provider>
        </TitleContext.Provider>
      </body>
    </html>
  );
}

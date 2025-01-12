"use client";

import { TitleContext } from "@/app/lib/stores";
import { useContext, useEffect } from "react";
import AnualGraph from "./components/AnualGraph";
import QuickAccess from "./components/QuickAccess";
import TopSales from "./components/TopSales";

export default function Dashboard() {
  const setTitle = useContext(TitleContext);

  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);

  return (
    <div className="p-5 mb-5">
      <QuickAccess />
      <TopSales />
      <AnualGraph />
    </div>
  );
}

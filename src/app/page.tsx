"use client"

import NavBar from "@/components/NavBar";
import Content from "@/components/Daily";
import { useState } from "react";
import { ActiveTabs } from "@/types/ActiveTabs";
import Investments from "@/components/Investments";
import Calculator from "@/components/Calculator";

export default function Home() {

  const [activeTab, setActiveTab] = useState<ActiveTabs>("daily")

  return (
    <main className="flex flex-col min-h-screen">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "daily" && (<Content />)}

      {activeTab === "investments" && (<Investments />)}

      {activeTab === "calculator" && (<Calculator />)}

    </main>
  )
}

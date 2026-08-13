"use client"

import { Icon } from "@iconify/react"

interface HistoryProps {
    goToDaily: () => void
}

export default function History({ goToDaily }: HistoryProps) {

    return (
        <section className="bg-[#151D33] flex-1 m-3 p-4 rounded-xl border border-amber-200/20">
            <div className="flex items-center gap-10">
                <div>
                    <h1 className="text-[50px] text-white">Yield History</h1>
                    <p className="text-zinc-400 text-[18px]">Track and manage all saved yields</p>
                </div>
                <button onClick={goToDaily} className="flex items-center gap-1">
                    <Icon icon="mingcute:plus-fill" /> New yield
                </button>
            </div>


        </section>
    )
}
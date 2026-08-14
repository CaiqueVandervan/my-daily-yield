import { ActiveTabs } from "@/types/ActiveTabs"
import { Icon } from "@iconify/react"

interface NavBarProps {
    activeTab: ActiveTabs
    setActiveTab: (tab: ActiveTabs) => void
}

export default function NavBar({ activeTab, setActiveTab }: NavBarProps) {

    const buttonClass = (tab: ActiveTabs) => (
        `rounded-xl py-2 px-4 flex items-center gap-1 cursor-pointer ${activeTab === tab ? "bg-amber-300 text-[#0B1329] -translate-y-1.5 duration-300" : ""}`
    )

    return (
        <header className="bg-[#151D33]/95 border-b border-amber-200/20">
            <div className="grid grid-cols-3 text-white p-10 px-20 items-center">
                <div className="justify-self-start">
                    <img src="/MyDailyYieldLogo.svg" width={300} height={300} />
                </div>
                <nav className="justify-self-center">
                    <div className="flex gap-10 ">
                        <button className={buttonClass("daily")}
                            onClick={() => setActiveTab("daily")}>
                            <Icon icon="hugeicons:task-daily-01" className="mb-0.5" />Daily
                        </button>
                        <button className={buttonClass("investments")}
                            onClick={() => setActiveTab("investments")}>
                            <Icon icon="heroicons:arrow-trending-up-20-solid" />Investments
                        </button>
                        <button className={buttonClass("calculator")}
                            onClick={() => setActiveTab("calculator")}>
                            <Icon icon="ion:calculator" className="mb-0.5" />Calculator
                        </button>
                    </div>
                </nav>
                <aside className="flex justify-self-end gap-10">
                    <div className="bg-[#0B1329] p-3 rounded-xl">
                        Saldo: <span className="text-green-400">R$5000,00</span>
                    </div>
                    <div className="bg-[#0B1329] p-3 rounded-xl">
                        Investimentos: <span className="text-green-400">R$100.000,00</span>
                    </div>
                </aside>
            </div>
        </header>
    )
}
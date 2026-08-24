"use client"

import { ValuesCalculation } from "@/types/ValuesCalculation"
import { Icon } from "@iconify/react"
import { useState } from "react"
import { UseFormSetValue } from "react-hook-form"

interface CustomSelect {
    setValue: UseFormSetValue<ValuesCalculation>
}

export default function CustomSelect({ setValue }: CustomSelect) {

    const [open, setOpen] = useState<boolean>(false)
    const [selectedCategory, setSelectedCategory] = useState({ icon: "", iconClassName: "", name: "Pick one" })

    const capital = 1333
    const juros = 0.015
    const tempo = 12

    const deposito = 500

    const totalcomaportes = deposito * ((Math.pow(1 + juros, tempo) - 1) / juros)



    const total = capital * Math.pow(1 + juros, tempo)
    const jurosrendimento = total - capital

    const totaltotal = total + totalcomaportes

    const categories = [
        {
            id: 1,
            name: "Restaurant",
            icon: "material-symbols:restaurant-rounded",
            iconClassName: "text-orange-400 text-[18px]",
        },
        {
            id: 2,
            name: "Gym",
            icon: "mdi:gym",
            iconClassName: "text-blue-400 text-[18px]",
        },
        {
            id: 3,
            name: "Suplements",
            icon: "tabler:milk-filled",
            iconClassName: "text-gray-200 text-[18px]",
        },
        {
            id: 4,
            name: "Bills",
            icon: "fa7-solid:money-bills",
            iconClassName: "text-emerald-400 text-[18px]",
        },
    ]

    const handleChangeCategory = (icon: string, iconClassName: string, name: string) => {
        setSelectedCategory({ icon, iconClassName, name })
        setValue("category", name)
        setOpen(false)
        console.log(totaltotal.toFixed(2))

    }

    return (
        <div className="relative w-45">
            <button className={`py-2 ${selectedCategory ? "px-3" : ""} rounded-xl bg-gray-500 w-45`}
                type="button"
                onClick={() => setOpen(!open)}>
                <div className="flex justify-between items-center">
                    <span className={`flex items-center ${selectedCategory ? "gap-2" : ""}`}><Icon className={selectedCategory.iconClassName} icon={selectedCategory.icon} />{selectedCategory.name}</span>
                    <Icon className={`transition duration-300 ${open ? "rotate-180  " : ""}`} icon="raphael:arrowdown" />
                </div>
            </button>

            <ul className={`absolute bg-gray-600 rounded-xl w-full mt-0.5 transition-opacity duration-300 ${open ? "opacity-100 " : "opacity-0 pointer-events-none"}`}>
                {categories.map((c) => (
                    <button className="flex items-center gap-2 hover:bg-amber-200 rounded-xl transation duration-200 w-full p-3"
                        type="button"
                        key={c.id}
                        onClick={() => handleChangeCategory(c.icon, c.iconClassName, c.name)}>
                        <Icon className={c.iconClassName} icon={c.icon} /> {c.name}
                    </button>
                ))}
            </ul>

        </div>

    )
}
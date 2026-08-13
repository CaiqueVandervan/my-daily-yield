"use client"

import formatDate from "@/utils/formatDate"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { DatePicker } from "./cn/DatePicker"

interface ValuesCalculation {
    value: string
    category: string
    date: string
    observation: string
}

export default function Daily() {

    const { register, handleSubmit, watch, formState: { isValid } } = useForm<ValuesCalculation>()

    const [alertMessage, setAlertMessage] = useState<{ message: string, type: string } | null>(null)

    const value = watch("value")

    const handleSubmitCalculation = () => {
        setAlertMessage({ message: "Rendimento gerado com sucesso", type: "sucess" })
    }

    useEffect(() => {
        setTimeout(() => {
            setAlertMessage(null)
        }, 3000)
    }, [alertMessage])

    const labelClasses = "pl-3 font-medium text-[20px] text-white flex items-center gap-2"
    const inputClasses = "p-2 rounded-xl bg-gray-500"

    return (
        <section className="grid grid-cols-3 items-start bg-[#151D33] flex-1 m-3 rounded-xl border border-amber-200/20 ">
            <div className="h-full border-r border-amber-200/20">
                <div className="grid justify-center gap-10 p-4">
                    <div>
                        <h1 className="text-[50px] text-white">Today's expenses</h1>
                        <p className="text-zinc-400 text-[18px]">Save new expenses</p>
                    </div>
                    <form className="grid gap-4"
                        onSubmit={handleSubmit(handleSubmitCalculation)} >
                        <div className="flex gap-10">
                            <div className="grid w-full gap-1">
                                <label className={labelClasses}
                                    htmlFor="value">
                                    <Icon className="text-amber-300"
                                        icon="tabler:coin"
                                        width={20} />
                                    Value
                                </label>
                                <input className={inputClasses}
                                    id="value"
                                    type="number"
                                    {...register("value", { required: true })}
                                    placeholder="R$"
                                />
                            </div>
                            <div className="grid w-full gap-1">
                                <label className={labelClasses}
                                    htmlFor="date">
                                    <Icon className="text-amber-300"
                                        icon="lets-icons:date-fill" />
                                    Date
                                </label>
                                {/* <input className={inputClasses}
                                    id="date"
                                    type="date"
                                    {...register("date", { required: true })}
                                /> */}
                                <DatePicker />
                            </div>
                        </div>


                        <div className="grid w-full gap-1">
                            <label className={labelClasses}
                                htmlFor="category">
                                <Icon className="text-amber-300"
                                    icon="tabler:coin"
                                    width={20} />
                                Category
                            </label>
                            <select className={inputClasses}
                                id="category"
                                {...register("category", { required: true })}
                            >

                            </select>

                        </div>

                        <div className="grid w-full gap-1">
                            <label className={labelClasses}
                                htmlFor="observation">
                                <Icon className="text-amber-300"
                                    icon="ri:information-fill" />
                                Observation
                            </label>
                            <input className={inputClasses}
                                id="observation"
                                type="text"
                                {...register("observation", { required: true })}
                                value="Today yield" />
                        </div>

                        <div>
                            <button className={`p-3 rounded-xl  ${isValid ? "bg-amber-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition duration-300" : "bg-amber-100"}`}
                                type="submit"
                                disabled={!isValid}>
                                {value ? `Save today's expense` : 'Salvar Rendimento de hoje (R$0,00)'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>


            <div className="grid justify-center col-span-2">
                <h1 className="text-[50px] text-white">Expenses history</h1>
                <p className="text-zinc-400 text-[18px]">Track and manage your expanses</p>
            </div>

            {alertMessage?.type === "sucess" && (
                <div className="absolute bottom-22 right-40 text-amber-300">teaaaaaaste</div>
            )}

        </section>
    )
}
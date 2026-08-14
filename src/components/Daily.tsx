"use client"

import formatDate from "@/utils/formatDate"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { DatePicker } from "./cn/DatePicker"
import CustomSelect from "./CustomSelect"
import { ValuesCalculation } from "@/types/ValuesCalculation"

export default function Daily() {

    const { register, handleSubmit, watch, setValue, formState: { isValid } } = useForm<ValuesCalculation>()

    const [alertMessage, setAlertMessage] = useState<{ message: string, type: string } | null>(null)

    const value = watch("value")
    const numericValue = value?.replace(/\D/g, "")

    const handleSubmitCalculation = () => {
        setAlertMessage({ message: "Rendimento gerado com sucesso", type: "sucess" })
    }

    useEffect(() => {
        setTimeout(() => {
            setAlertMessage(null)
        }, 3000)
    }, [alertMessage])

    const labelClasses = "pl-3 font-medium text-[20px] text-white flex items-center gap-2"
    const inputClasses = "p-2 rounded-xl bg-gray-600 text-white outline-none focus:ring-1 focus:ring-white hover:bg-gray-500 transition duration-200 appearance-none"

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
                                    type="text"
                                    inputMode="numeric"
                                    {...register("value", {
                                        required: true,
                                        onChange: (e) => {
                                            e.target.value = e.target.value.replace(/\D/g, "")
                                        }
                                    })}
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
                            <label className={labelClasses}>
                                <Icon className="text-amber-300"
                                    icon="material-symbols:category"
                                    width={20} />
                                Category
                            </label>

                            <CustomSelect setValue={setValue} />
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
                                {numericValue ? `Save today's expense (R$${numericValue})` : "Save today's expense"}
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
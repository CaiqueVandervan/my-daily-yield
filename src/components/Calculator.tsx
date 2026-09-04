
import { CompoundCalculator } from "@/types/CompundCalculator"
import { formatMoney, MaskMoneyForInput } from "@/utils/formatMoney"
import { Icon } from "@iconify/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { InterestBarChart } from "./cn/InterestBarChart"

export interface InterestResult {
    time: number
    totalWithDepositOverYears: number
    capital: number
    interestIncome: number
    deposit: number
    totalInvested: number
    selectedTime: number
}

interface SelectPeriodOptions {
    id: number
    name: "Years" | "Months"
}

export default function Calculator() {

    const { register, handleSubmit, setValue, watch, formState: { isValid } } = useForm<CompoundCalculator>()

    const [result, setResult] = useState<InterestResult[]>()
    const [openSelectOptions, setOpenSelectOptions] = useState<boolean>(false)

    const timeType = watch("timeType")

    const handleSubmitValues = (data: CompoundCalculator) => {

        const capital = data.capital
        const interest = Number(data.interest) / 100
        const time = Number(data.time)
        const deposit = data.deposit
        const selectedTime = data.timeType === "Years"
            ? time * 12
            : time

        const results: InterestResult[] = []

        for (let i = 0; i <= selectedTime; i++) {
            const totalWithoutDepositOverYears = capital * Math.pow(1 + interest, i)
            const depositOverYears = deposit * ((Math.pow(1 + interest, i) - 1) / interest)
            const totalWithDepositOverYears = totalWithoutDepositOverYears + depositOverYears
            const totalInvested = capital + (deposit * i)
            const interestIncome = totalWithDepositOverYears - totalInvested

            results.push(
                {
                    time: i,
                    totalWithDepositOverYears: totalWithDepositOverYears,
                    capital: capital,
                    interestIncome: interestIncome,
                    deposit: deposit,
                    totalInvested: totalInvested,
                    selectedTime: selectedTime
                }
            )
        }
        setResult(results)
    }


    const finalResult = result?.[result.length - 1]

    const selectPeriodOptions: SelectPeriodOptions[] = [
        {
            id: 1,
            name: "Years"
        },
        {
            id: 2,
            name: "Months"
        }
    ]

    const labelClasses = "pl-3 font-medium text-[20px] text-white flex items-center gap-2"
    const inputClasses = "p-2 rounded-xl bg-gray-600 text-white focus:ring-1 focus:ring-white hover:bg-gray-500 transition duration-200"

    return (
        <section className="grid grid-cols-2 bg-[#151D33] flex-1 m-3 rounded-xl border border-amber-200/20">
            <div className="border-r border-amber-200/20">
                <div className="grid p-1 gap-5">
                    <div className="grid justify-center">
                        <h1 className="text-[50px] text-white">Compound interest calculator</h1>
                        <p className="text-zinc-400 text-[18px]">See how your money gan grow over time</p>
                        {/* <p className="text-zinc-400 text-[18px]">Compound interest calculator and upfront vs installments calculator</p> */}
                    </div>

                    <form className="grid gap-5 items-center justify-center"
                        onSubmit={handleSubmit(handleSubmitValues)}>

                        <div className="grid gap-9 items-center justify-center">
                            <div className="flex gap-10">
                                <div className="grid w-full gap-1">
                                    <label className={labelClasses}
                                        htmlFor="capital">
                                        <Icon className="text-amber-300"
                                            icon="tabler:coin"
                                            width={20} />
                                        Capital
                                    </label>
                                    <input className={inputClasses}
                                        id="capital"
                                        type="text"
                                        autoComplete="off"
                                        {...register("capital", {
                                            required: true,
                                            setValueAs: (value) => {
                                                const digits = value.replace(/\D/g, "")
                                                return Number(digits) / 100
                                            },
                                            onChange: (e) => {
                                                e.target.value = MaskMoneyForInput(e.target.value)
                                            }
                                        })}
                                        placeholder="R$"
                                    />
                                </div>
                                <div className="grid w-full gap-1">
                                    <label className={labelClasses}
                                        htmlFor="interest">
                                        <Icon className="text-amber-300"
                                            icon="mynaui:percentage-solid"
                                            width={20} />
                                        Interest
                                    </label>
                                    <input className={inputClasses}
                                        id="interest"
                                        type="text"
                                        autoComplete="off"
                                        {...register("interest", {
                                            required: true,
                                            onChange: (e) => {
                                                e.target.value = e.target.value.replace(/\D/g, "")
                                            }
                                        })}
                                        placeholder="%"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-10">
                                <div className="relative grid w-full gap-1">
                                    <div className="flex justify-between">
                                        <label className={labelClasses}
                                            htmlFor="time">
                                            <Icon className="text-amber-300"
                                                icon="mingcute:time-line"
                                                width={20} />
                                            Time
                                        </label>
                                        <button className="absolute right-[-6] top-[-3] mt-2 mr-2 text-white text-[12px] flex items-center gap-2 p-1 rounded-xl bg-gray-600 focus:ring-1 focus:ring-white hover:bg-gray-500 transition duration-200"
                                            onClick={() => setOpenSelectOptions(!openSelectOptions)}
                                            type="button">
                                            {timeType || "Months"}
                                            <Icon icon="raphael:arrowup" />
                                        </button>
                                    </div>

                                    <ul className={`absolute right-1 top-[-34] bg-gray-700 w-17 rounded-xl transition-opacity duration-300 ${openSelectOptions ? "opacity-100 " : "opacity-0 pointer-events-none"}`}>
                                        <div className="grid ">
                                            {selectPeriodOptions.map(o => (
                                                <button className="text-[12px] hover:bg-amber-200 rounded-xl transation duration-200 text-start px-1.5"
                                                    key={o.id}
                                                    onClick={() => {
                                                        setValue("timeType", o.name)
                                                        setOpenSelectOptions(false)
                                                    }}
                                                    type="button">
                                                    {o.name}
                                                </button>
                                            ))}
                                        </div>
                                    </ul>

                                    <input className={inputClasses}
                                        id="time"
                                        type="text"
                                        autoComplete="off"
                                        {...register("time", {
                                            required: true,
                                            onChange: (e) => {
                                                e.target.value = e.target.value.replace(/\D/g, "")
                                            }
                                        })}
                                        placeholder="Months or years"
                                    />
                                </div>
                                <div className="grid w-full gap-1">
                                    <label className={labelClasses}
                                        htmlFor="deposit">
                                        <Icon className="text-amber-300"
                                            icon="tabler:coin"
                                            width={20} />
                                        Deposit
                                    </label>
                                    <input className={inputClasses}
                                        id="deposit"
                                        type="text"
                                        autoComplete="off"
                                        {...register("deposit", {
                                            setValueAs: (value) => {
                                                const digits = value.replace(/\D/g, "")
                                                return Number(digits) / 100
                                            },
                                            onChange: (e) => {
                                                e.target.value = MaskMoneyForInput(e.target.value)
                                            }
                                        })}
                                        placeholder="R$"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="text-center">
                            <button className={`p-3 rounded-xl  ${isValid ? "bg-amber-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition duration-300" : "bg-amber-100"}`}
                                type="submit"
                                disabled={!isValid}>
                                Calcule your interest
                            </button>
                        </div>
                    </form>

                    {result && (
                        <div className="grid gap-3">
                            <div className="flex justify-center">
                                <div className="grid gap-2 rounded-xl bg-gray-800 text-white p-2 border border-amber-200/20 w-[70%]">
                                    <div className="font-medium text-[24px] text-white flex items-center gap-2">
                                        <Icon className="text-amber-300 mb-1"
                                            icon="carbon:result"
                                            width={28} />
                                        <h1>Results</h1>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="border-r border-amber-200/20">
                                            <p className="text-[14px]">Total income</p>
                                            <p className="text-green-400 text-[28px]">{formatMoney(finalResult?.totalWithDepositOverYears ?? 0)}</p>
                                        </div>
                                        <div className="border-r border-amber-200/20">
                                            <p className="text-[14px]">Total Invested</p>
                                            <p className=" text-[28px]">{formatMoney(finalResult?.totalInvested ?? 0)}</p>
                                        </div>


                                        <div>
                                            <p className="text-[14px]">Interest</p>
                                            <p className="text-[28px]">{formatMoney(finalResult?.interestIncome ?? 0)}</p>
                                        </div>


                                    </div>
                                </div>

                            </div>
                            <div className="flex justify-center">
                                <div className="w-[90%]">
                                    <InterestBarChart chartData={result} />
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

        </section>
    )
}

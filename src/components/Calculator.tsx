
import { CompoundCalculator } from "@/types/CompundCalculator"
import { formatMoney, MaskMoneyForInput } from "@/utils/formatMoney"
import { Icon } from "@iconify/react"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface CompoundInterestResult {
    totalWithDepositOverYears: number
    capital: number
    interestIncome: number
    deposit: number
    totalInvested: number
}

interface SelectPeriodOptions {
    id: number
    name: "Years" | "Months"
}

export default function Calculator() {

    const { register, handleSubmit, setValue, watch, formState: { isValid } } = useForm<CompoundCalculator>()

    const [result, setResult] = useState<CompoundInterestResult>()
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

        const totalWithoutDepositOverYears = capital * Math.pow(1 + interest, selectedTime)
        const depositOverYears = deposit * ((Math.pow(1 + interest, selectedTime) - 1) / interest)
        const totalWithDepositOverYears = totalWithoutDepositOverYears + depositOverYears
        const interestIncome = totalWithDepositOverYears - capital

        setResult({
            totalWithDepositOverYears: totalWithDepositOverYears,
            capital: capital,
            interestIncome: interestIncome,
            deposit: deposit,
            totalInvested: capital + (deposit * selectedTime)
        })
    }

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
        <section className="grid grid-cols-2 bg-[rgb(21,29,51)] flex-1 m-3 rounded-xl border border-amber-200/20">
            <div className="border-r border-amber-200/20">
                <div className="grid justify-center p-4 gap-10">
                    <div>
                        <h1 className="text-[50px] text-white">Compound interest calculator</h1>
                        <p className="text-zinc-400 text-[18px]">See how your money gan grow over time</p>
                        {/* <p className="text-zinc-400 text-[18px]">Compound interest calculator and upfront vs installments calculator</p> */}
                    </div>

                    <form className="grid gap-10 items-center justify-center"
                        onSubmit={handleSubmit(handleSubmitValues)}>

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

                        <div className="text-center">
                            <button className={`p-3 rounded-xl  ${isValid ? "bg-amber-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition duration-300" : "bg-amber-100"}`}
                                type="submit"
                                disabled={!isValid}>
                                Calcule your interest
                            </button>
                        </div>
                    </form>

                    {result && (
                        <div className="grid rounded-xl bg-gray-600 text-white p-4">
                            <p>Total income:{" "}<span>{formatMoney(result.totalWithDepositOverYears)}</span></p>
                            <p>Initial capital:{" "}<span>{formatMoney(result.capital)}</span></p>
                            <p>Interest:{" "}<span>{formatMoney(result.interestIncome)}</span></p>
                            <p>Deposit:{" "}<span>{formatMoney(result.deposit)}</span></p>
                            <p>Total Invested:{" "}<span>{formatMoney(result.totalInvested)}</span></p>
                        </div>
                    )}

                </div>
            </div>

        </section>
    )
}

"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

interface ValuesCalculation {
    initialValue: string
    actualValue: string
}

export default function Content() {

    const { register, handleSubmit, formState: { isValid } } = useForm<ValuesCalculation>()

    const [increase, setIncrease] = useState<number>()
    const [percent, setPercent] = useState<number>()

    const handleSubmitCalculation = (data: ValuesCalculation) => {
        const rest = Number(data.actualValue) - Number(data.initialValue)
        const numberPercent = (rest / Number(data.initialValue)) * 100
        setIncrease(rest)
        setPercent(numberPercent)
    }

    return (
        <section className="bg-[#151D33] flex-1 m-3 p-4 rounded-xl border border-amber-200/20 ">
            <div className="flex gap-4">
                <form className="grid gap-4"
                    onSubmit={handleSubmit(handleSubmitCalculation)} >
                    <div className="grid w-fit gap-1">
                        <label className="pl-3 font-medium text-[20px] text-white"
                            htmlFor="initialValue">
                            Initial Value
                        </label>
                        <input className="p-2 rounded-xl bg-gray-300"
                            id="initialValue"
                            type="number"
                            {...register("initialValue", { required: true })}
                            placeholder="Ex: 1335"
                        />
                    </div>
                    <div className="grid w-fit gap-1">
                        <label className="pl-3 font-medium text-[20px] text-white"
                            htmlFor="actualValue">
                            Actual Value
                        </label>
                        <input className="p-2 rounded-xl bg-gray-300"
                            id="actualValue"
                            type="number"
                            {...register("actualValue", { required: true })}
                            placeholder="Ex: 1335" />
                    </div>

                    <div>
                        <button className={`p-3 rounded-xl  ${isValid ? "bg-amber-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition duration-300" : "bg-amber-100"}`}
                            type="submit"
                            disabled={!isValid}>
                            Calcule
                        </button>
                    </div>
                </form>
                <div className="bg-amber-200">
                    seu dinheiro aumentou em {increase} reais, uma diferença de {percent}
                </div>
            </div>

        </section>
    )
}
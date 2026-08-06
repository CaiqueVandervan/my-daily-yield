"use client"

import { useForm } from "react-hook-form"

interface ValuesCalculation {
    initialValue: string
    actualValue: string
}

export default function Content() {

    const { register, handleSubmit, reset } = useForm<ValuesCalculation>()

    const handleSubmitCalculation = (data: ValuesCalculation) => {
        console.log("data=>", data)
    }

    return (
        <section className="bg-[#151D33] flex-1 m-3 p-4 rounded-xl border border-amber-200/20 ">
            <form onSubmit={handleSubmit(handleSubmitCalculation)} className="grid gap-4">
                <div className="grid w-fit gap-1">
                    <label className="pl-3 font-medium text-[20px] text-white" htmlFor="initialValue">
                        Initial Value
                    </label>
                    <input className="p-2 rounded-xl bg-gray-300" id="initialValue" type="number" {...register("initialValue")} placeholder="Ex: 1335" />
                </div>
                <div className="grid w-fit gap-1">
                    <label className="pl-3 font-medium text-[20px] text-white" htmlFor="actualValue">
                        Actual Value
                    </label>
                    <input className="p-2 rounded-xl bg-gray-300" id="actualValue" type="number" {...register("actualValue")} placeholder="Ex: 1335" />
                </div>

                <div>
                    <button type="submit" className="p-3 rounded-xl cursor-pointer hover:-translate-y-1 hover:shadow-xl transition duration-300 bg-amber-300">
                        Calcule
                    </button>
                </div>
            </form>
        </section>
    )
}
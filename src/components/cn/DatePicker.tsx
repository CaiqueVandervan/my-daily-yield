"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/utils/cn"
import { Button } from "@/components/cn/Button"
import { Calendar } from "@/components/cn/Calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/cn/Popover"

export function DatePicker() {
    const [date, setDate] = React.useState<Date>()

    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button
                        variant="outline"
                        data-empty={!date}
                        className="justify-start text-left font-normal data-[empty=true]:text-[#737373]"
                    />
                }
            >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
        </Popover>
    )
}
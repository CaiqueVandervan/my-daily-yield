"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cn/Card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/cn/Chart"
import { InterestResult } from "../Calculator"

interface InterestBarChartProps {
    chartData: InterestResult[]
}

const chartConfig = {
    totalWithDepositOverYears: {
        label: "Total with deposit",
    },
    totalInvested: {
        label: "Total Invested",
    },
    interestIncome: {
        label: "Interest"
    }
} satisfies ChartConfig

export function InterestBarChart({ chartData }: InterestBarChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Total along the Months</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[160px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        // tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="totalWithDepositOverYears"
                            stackId="a"
                            fill="#2DD4BF"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="totalInvested"
                            stackId="a"
                            fill="#64748B"
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="interestIncome"
                            stackId="a"
                            fill="#D4A72C"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

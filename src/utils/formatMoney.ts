export const formatMoney = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export const MaskMoneyForInput = (value: string) => {
    const digits = value.replace(/\D/g, "")
    return formatMoney(Number(digits) / 100)
}
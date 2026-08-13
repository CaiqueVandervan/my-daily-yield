// export default function formatDate(date: string) {
//     return new Date(date).toLocaleString("pt-br", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric"
//     })
// }

export default function formatDate(date: string) {
    if (!date) return
    const [year, month, day] = date.split("-")

    return `${day}/${month}/${year}`
}
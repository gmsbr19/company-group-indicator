export type group = {
    id: number
    label: string
    color: string
    show: boolean
    from_seat: number
    to_seat: number
    side: string
    message: string
    priority?: number | boolean
    company_id: number
    gate_id: number
}

// export const golGroups: group[] = [
//     {
//         id: 0,
//         label: "1",
//         color: "#180f38",
//         show: false,
//         from: "",
//         to: "",
//         side: "none",
//         priority: true
//     },
//     {
//         id: 1,
//         color: "#211616",
//         label: "2",
//         show: false,
//         from: "",
//         to: "",
//         side: "none",
//     },
//     {
//         id: 2,
//         color: "#8c2e03",
//         show: false,
//         from: "",
//         to: "",
//         side: "none",
//         label: "3 e 4"
//     },
// ]
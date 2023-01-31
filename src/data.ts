export type group = {
    id: number
    label: string
    color: string
    show: boolean
    seats: number[]
    priority?: boolean
}

export const golGroups: group[] = [
    {
        id: 0,
        label: "1",
        color: "#180f38",
        show: false,
        seats: [],
        priority: true
    },
    {
        id: 1,
        color: "#211616",
        show: false,
        seats: [],
        label: "2"
    },
    {
        id: 2,
        color: "#8c2e03",
        show: false,
        seats: [],
        label: "3 e 4"
    },
]
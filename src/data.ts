export type group = {
    id: number
    label: string
    color: string
    show: boolean
    seats: number[]
    side: string
    priority?: boolean
}

export const golGroups: group[] = [
    {
        id: 0,
        label: "1",
        color: "#180f38",
        show: false,
        seats: [],
        side: "none",
        priority: true
    },
    {
        id: 1,
        color: "#211616",
        show: false,
        seats: [],
        side: "none",
        label: "2"
    },
    {
        id: 2,
        color: "#8c2e03",
        show: false,
        seats: [],
        side: "none",
        label: "3 e 4"
    },
]
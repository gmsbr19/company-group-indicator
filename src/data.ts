export type group = {
    id: number
    label: string
    color: string
    priority?: boolean
}

export const golGroups: group[] = [
    {
        id: 0,
        label: "1",
        color: "#180f38",
        priority: true
    },
    {
        id: 1,
        color: "#211616",
        label: "2"
    },
    {
        id: 2,
        color: "#8c2e03",
        label: "3"
    },
    {
        id: 3,
        color: "#8c2e03",
        label: "4"
    },
]
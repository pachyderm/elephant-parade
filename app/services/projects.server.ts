import {prisma} from 'utils/prisma.server'

export const getProjectsList = async () => {
    return prisma.project.findMany({
        select: {
            id: true,
            name: true,
            projectKey: true,
            uri: true,
            lead: {select: {name: true}},
        },
        orderBy: {name: 'asc'},
    })
}

export type ProjectsList = Awaited<ReturnType<typeof getProjectsList>>

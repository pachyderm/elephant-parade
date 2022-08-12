import { prisma } from 'utils/prisma.server'

export const getIssuesList = async () => {
    return prisma.issue.findMany({
        select: {
            id: true,
            name: true,
            status: true,
            project: { select: { name: true } },
        },
        orderBy: { name: 'asc' },
    })
}

export type IssuesList = Awaited<ReturnType<typeof getIssuesList>>

import { prisma } from 'utils/prisma.server'

export const getIssueList = async () => {
    return await prisma.issue.findMany({
        select: {
            id: true,
            name: true,
            status: true,
            project: { select: { name: true } },
        },
        orderBy: { name: 'asc' },
    })
}

export const getIssuesListByProject = async ({
    projectId,
}: {
    projectId: string
}) => {
    return await prisma.issue.findMany({
        where: {
            project: {
                id: projectId,
            },
        },
        select: {
            id: true,
            name: true,
            status: true,
            summary: true,
        },
        orderBy: { name: 'asc' },
    })
}

export type IssueList = Awaited<ReturnType<typeof getIssueList>>

export type IssuesListByProject = Awaited<
    ReturnType<typeof getIssuesListByProject>
>

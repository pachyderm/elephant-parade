import { prisma } from 'utils/prisma.server'

export const getProjectList = async () => {
    return await prisma.project.findMany({
        select: {
            id: true,
            name: true,
            projectKey: true,
            uri: true,
            lead: { select: { name: true } },
        },
        orderBy: { name: 'asc' },
    })
}

export const getProjectDetails = async ({
    projectId,
}: {
    projectId: string
}) => {
    return await prisma.project.findUnique({
        where: {
            id: projectId,
        },
        include: {
            lead: {
                select: {
                    id: true,
                    name: true,
                },
            },
            issues: {
                select: {
                    id: true,
                    name: true,
                    summary: true,
                    status: true,
                    type: true,
                },
                orderBy: {
                    name: 'desc',
                },
            },
            releases: {
                select: {
                    id: true,
                    name: true,
                    releaseStatus: true,
                    supportStatus: true,
                    type: true,
                },
                orderBy: {
                    name: 'desc',
                },
            },
        },
    })
}

export type ProjectList = Awaited<ReturnType<typeof getProjectList>>

export type ProjectDetails = Awaited<ReturnType<typeof getProjectDetails>>

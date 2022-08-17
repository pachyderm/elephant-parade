import { prisma } from 'utils/prisma.server'

export const getReleaseList = async () => {
    return await prisma.release.findMany({
        select: {
            id: true,
            name: true,
            project: { select: { name: true } },
            type: true,
        },
        orderBy: { name: 'asc' },
    })
}

export type ReleaseList = Awaited<ReturnType<typeof getReleaseList>>

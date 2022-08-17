import { prisma } from 'utils/prisma.server'

export const getReleaseList = async () => {
    return await prisma.release.findMany({
        select: {
            id: true,
            name: true,
            project: { select: { name: true } },
            type: true,
            supportStatus: true,
            releaseStatus: true,
            dateReleased: true,
        },
        orderBy: { name: 'desc' },
    })
}

export type ReleaseList = Awaited<ReturnType<typeof getReleaseList>>

import { prisma } from 'utils/prisma.server'

export const getCompanyList = async () => {
    return await prisma.company.findMany({
        select: {
            id: true,
            name: true,
            employees: {
                select: {
                    _count: true,
                },
            },
        },
        orderBy: {
            name: 'asc',
        },
    })
}

export type CompanyList = Awaited<ReturnType<typeof getCompanyList>>

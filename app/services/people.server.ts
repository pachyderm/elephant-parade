import {prisma} from 'utils/prisma.server'

export const getPeopleList = async ({
                                        companyId,
                                    }: { companyId?: string } = {}) => {
    if (!!companyId) {
        return prisma.person.findMany({
            where: {company: {id: companyId}},
            select: {
                name: true,
                id: true,
                company: {select: {name: true}},
                email: true,
            },
            orderBy: {name: 'asc'},
        })
    } else {
        return prisma.person.findMany({
            select: {
                name: true,
                id: true,
                company: {select: {name: true}},
                email: true,
            },
            orderBy: {name: 'asc'},
        })
    }
}

export type PeopleList = Awaited<ReturnType<typeof getPeopleList>>

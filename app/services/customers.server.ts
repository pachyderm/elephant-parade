import { prisma } from 'utils/prisma.server'

export const getCustomerList = async () => {
    return await prisma.customer.findMany({
        select: {
            id: true,
            company: {
                select: {
                    name: true,
                },
            },
            accountExecutive: {
                select: {
                    self: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            customerEngineer: {
                select: {
                    self: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            contract: {
                select: {
                    endDate: true,
                    users: true,
                },
            },
        },
        orderBy: {
            company: {
                name: 'asc',
            },
        },
    })
}

export type CustomerList = Awaited<ReturnType<typeof getCustomerList>>

import type { LoaderFunction } from '@remix-run/node'

import { useLoaderData } from '@remix-run/react'
import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import { LinkedTable } from 'components/LinkedTable'
import { getCustomerList } from 'services/customers.server'
import type { CustomerList } from 'services/customers.server'
import type { ComponentField } from 'components/types'

type LoaderData = {
    customerList: CustomerList
}

export const loader: LoaderFunction = async () => {
    const customerList = await getCustomerList()
    return { customerList }
}

export default function CustomerListPage() {
    const { customerList } = useLoaderData<LoaderData>()

    const headingSize = useBreakpointValue({ base: 'lg', sm: '2xl', lg: '4xl' })
    const headings = ['Name', 'AE', 'CE', 'Renewal Date', 'Users']
    const baseUrl = '/customers'

    const fields: ComponentField[] = [
        { fieldName: ['company', 'name'] },
        { fieldName: ['accountExecutive', 'self', 'name'] },
        { fieldName: ['customerEngineer', 'self', 'name'] },
        { fieldName: ['contract', 'endDate'] },
        { fieldName: ['contract', 'users'] },
    ]
    return (
        <Stack
            justify='center'
            textAlign='center'
            h='100vh'
            flex={1}
            color='gray.900'
            gap={20}
        >
            <Stack gap={4} p={{ base: 4, md: 8 }}>
                <Heading
                    as='h2'
                    size={headingSize}
                    textTransform='uppercase'
                    color='green.400'
                >
                    Customers
                </Heading>
            </Stack>
            <LinkedTable
                headings={headings}
                collection={customerList}
                baseUrl={baseUrl}
                fields={fields}
            />
        </Stack>
    )
}

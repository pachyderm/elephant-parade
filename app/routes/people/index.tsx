import type { LoaderFunction } from '@remix-run/node'
import type { PeopleList } from 'services/people.server'
import { getPeopleList } from 'services/people.server'
import { useLoaderData } from '@remix-run/react'
import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import { LinkedTable } from 'components/LinkedTable'

type LoaderData = {
    peopleList: PeopleList
}

export const loader: LoaderFunction = async () => {
    const peopleList = await getPeopleList()
    return { peopleList }
}

export default function PeopleListPage() {
    const { peopleList } = useLoaderData<LoaderData>()
    const headingSize = useBreakpointValue({ base: 'lg', sm: '2xl', lg: '4xl' })
    const personHeadings = ['Name', 'Email', 'Company']
    const baseUrl = '/people'
    const fields = [['name'], ['email'], ['company', 'name']]
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
                    People
                </Heading>
            </Stack>
            <LinkedTable
                headings={personHeadings}
                collection={peopleList}
                fields={fields}
                baseUrl={baseUrl}
            />
        </Stack>
    )
}

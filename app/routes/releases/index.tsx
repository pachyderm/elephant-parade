import type { LoaderFunction } from '@remix-run/node'

import { useLoaderData } from '@remix-run/react'
import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import { LinkedTable } from 'components/LinkedTable'
import type { ReleaseList } from 'services/releases.server'
import { getReleaseList } from 'services/releases.server'

type LoaderData = {
    releaseList: ReleaseList
}

export const loader: LoaderFunction = async () => {
    const releaseList = await getReleaseList()
    return { releaseList }
}

export default function ReleaseListPage() {
    const { releaseList } = useLoaderData<LoaderData>()
    const headingSize = useBreakpointValue({ base: 'lg', sm: '2xl', lg: '4xl' })
    const headings = ['Name', 'Type', 'Project']
    const baseUrl = '/releases'
    const fields = [['name'], ['type'], ['project', 'name']]
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
                    Releases
                </Heading>
            </Stack>
            <LinkedTable
                headings={headings}
                collection={releaseList}
                baseUrl={baseUrl}
                fields={fields}
            />
        </Stack>
    )
}

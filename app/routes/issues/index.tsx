import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import type { IssueList } from 'services/issues.server'
import { getIssueList } from 'services/issues.server'
import { LinkedTable } from 'components/LinkedTable'

type LoaderData = {
    issueList: IssueList
}

export const loader: LoaderFunction = async () => {
    const issueList = await getIssueList()
    return { issueList }
}

export default function IssuesListPage() {
    const { issueList } = useLoaderData<LoaderData>()
    const headingSize = useBreakpointValue({ base: 'lg', sm: '2xl', lg: '4xl' })
    const issueHeadings = ['Name', 'Status', 'Project']
    const baseUrl = '/issues'
    const fields = [['name'], ['status'], ['project', 'name']]

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
                    Issues
                </Heading>
            </Stack>
            <LinkedTable
                headings={issueHeadings}
                collection={issueList}
                baseUrl={baseUrl}
                fields={fields}
            />
        </Stack>
    )
}

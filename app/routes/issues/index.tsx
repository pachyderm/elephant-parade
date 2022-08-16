import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import type { IssuesList } from 'services/issues.server'
import { getIssuesList } from 'services/issues.server'
import { LinkedTable } from 'components/LinkedTable'

type LoaderData = {
    issuesList: IssuesList
}

export const loader: LoaderFunction = async () => {
    const issuesList = await getIssuesList()
    return { issuesList }
}

export default function IssuesListPage() {
    const { issuesList } = useLoaderData<LoaderData>()
    const headingSize = useBreakpointValue({ base: 'lg', sm: '2xl', lg: '4xl' })
    const issueHeadings = ['Name', 'Status', 'Project']
    const issues = issuesList?.map(issue => [
        issue.name,
        issue.status.toString(),
        issue.project?.name,
    ])
    const issueUris = issuesList.map(issue => `/issues/${issue.id}`)
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
                rows={issues}
                uris={issueUris}
            />
        </Stack>
    )
}

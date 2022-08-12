import type { LoaderFunction } from '@remix-run/node'
import type { ProjectsList } from 'services/projects.server'
import { getProjectsList } from 'services/projects.server'
import { useLoaderData } from '@remix-run/react'
import {
    Heading,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
} from '@chakra-ui/react'
import { getIssuesList, IssuesList } from 'services/issues.server'

type LoaderData = {
    issuesList: IssuesList
}

export const loader: LoaderFunction = async () => {
    const issuesList = await getIssuesList()
    return { issuesList }
}

export default function IssuesList() {
    const { issuesList } = useLoaderData<LoaderData>()
    const headingSize = useBreakpointValue({ base: 'lg', sm: '2xl', lg: '4xl' })
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
            <TableContainer scrollBehavior={'auto'} overflowY={'auto'}>
                <Table variant={'striped'} colorScheme={'linkedin'}>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Status</Th>
                            <Th>Project</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {issuesList.map(issue => (
                            <Tr key={issue.id}>
                                <Td>{issue.name}</Td>
                                <Td>{issue.status}</Td>
                                <Td>{issue.project?.name}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Stack>
    )
}

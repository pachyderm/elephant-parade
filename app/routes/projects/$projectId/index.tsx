import type { ProjectDetails } from 'services/projects.server'
import { useCatch, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getProjectDetails } from 'services/projects.server'
import invariant from 'tiny-invariant'
import {
    Heading,
    HStack,
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
import { useParams } from '@remix-run/react'

type LoaderData = {
    projectDetails: ProjectDetails
}

export const loader: LoaderFunction = async ({ params }) => {
    invariant(params?.projectId != undefined)
    const projectDetails = await getProjectDetails({
        projectId: params.projectId,
    })
    if (!projectDetails) {
        throw new Response('Project does not exist', {
            status: 404,
        })
    }
    const data: LoaderData = { projectDetails }
    return json(data)
}

export default function ProjectDetails() {
    const data = useLoaderData<LoaderData>()
    const { projectDetails } = data
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
                    Project Details: {projectDetails?.name}
                </Heading>
                <Heading as={'h3'} color={'gray.800'}>
                    Project Lead: {projectDetails?.lead?.name}
                </Heading>

                <HStack flex={1} gap={4} alignItems={'flex-start'}>
                    <TableContainer
                        scrollBehavior={'auto'}
                        overflowY={'auto'}
                        flex={2}
                    >
                        Issues
                        <Table
                            variant={'striped'}
                            colorScheme={'linkedin'}
                            size={'sm'}
                        >
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Summary</Th>
                                    <Th>Type</Th>
                                    <Th>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {projectDetails?.issues.map(issue => (
                                    <Tr key={issue.id}>
                                        <Td>{issue.name}</Td>
                                        <Td>{issue.summary}</Td>
                                        <Td>{issue.type}</Td>
                                        <Td>{issue.status}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <TableContainer
                        scrollBehavior={'auto'}
                        overflowY={'auto'}
                        flex={1}
                    >
                        Releases
                        <Table
                            variant={'striped'}
                            colorScheme={'linkedin'}
                            size={'sm'}
                        >
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Type</Th>
                                    <Th>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {projectDetails?.releases.map(release => (
                                    <Tr key={release.id}>
                                        <Td>{release.name}</Td>
                                        <Td>{release.type}</Td>
                                        <Td>{release.status}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </HStack>
            </Stack>
        </Stack>
    )
}

export function CatchBoundary() {
    const caught = useCatch()
    const params = useParams()
    if (caught.status === 404) {
        return (
            <div className='error-container'>
                "{params.projectId}" does not exist
            </div>
        )
    }
    throw new Error(`Unhandled error: ${caught.status}`)
}

export function ErrorBoundary() {
    const { projectId } = useParams()
    return (
        <div className='error-container'>{`There was an error loading project by the id ${projectId}. Sorry.`}</div>
    )
}

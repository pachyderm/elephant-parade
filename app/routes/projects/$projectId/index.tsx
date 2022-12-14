import type { ProjectDetails } from 'services/projects.server'
import { getProjectDetails } from 'services/projects.server'
import { useCatch, useLoaderData, useParams } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { Heading, HStack, Stack, useBreakpointValue } from '@chakra-ui/react'
import { LinkedTable } from 'components/LinkedTable'
import type { ComponentField } from 'components/types'

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

export default function ProjectDetailsPage() {
    const data = useLoaderData<LoaderData>()
    const { projectDetails } = data
    const headingSize = useBreakpointValue({ base: 'lg', sm: '2xl', lg: '4xl' })

    invariant(projectDetails?.issues, 'Project Issues Undefined')
    invariant(projectDetails?.releases, 'Project Releases Undefined')
    const issueHeadings = ['Name', 'Summary', 'Type', 'Status']
    const issues = projectDetails.issues
    const issuesBaseUrl = '/issues'
    const issueFields: ComponentField[] = [
        { fieldName: ['name'] },
        { fieldName: ['summary'] },
        { fieldName: ['type'] },
        { fieldName: ['status'] },
    ]
    const releaseHeadings = ['Name', 'Type', 'Status', 'Support']
    const releases = projectDetails.releases
    const releaseFields: ComponentField[] = [
        { fieldName: ['name'] },
        { fieldName: ['type'] },
        { fieldName: ['releaseStatus'] },
        { fieldName: ['supportStatus'] },
    ]
    const releasesBaseUrl = '/releases'
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
                    <LinkedTable
                        name={'Issues'}
                        headings={issueHeadings}
                        collection={issues}
                        fields={issueFields}
                        baseUrl={issuesBaseUrl}
                    />
                    <LinkedTable
                        name={'Releases'}
                        headings={releaseHeadings}
                        collection={releases}
                        baseUrl={releasesBaseUrl}
                        fields={releaseFields}
                    />
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

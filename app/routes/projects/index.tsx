import type { LoaderFunction } from '@remix-run/node'
import type { ProjectsList } from 'services/projects.server'
import { getProjectsList } from 'services/projects.server'
import { useLoaderData } from '@remix-run/react'
import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import { LinkedTable } from 'components/LinkedTable'

type LoaderData = {
    projectsList: ProjectsList
}

export const loader: LoaderFunction = async () => {
    const projectsList = await getProjectsList()
    return { projectsList }
}

export default function ProjectsListPage() {
    const { projectsList } = useLoaderData<LoaderData>()
    const headingSize = useBreakpointValue({ base: 'lg', sm: '2xl', lg: '4xl' })
    const projectHeadings = ['Name', 'Key', 'Lead']
    const projects = projectsList.map(project => [
        project.name,
        project.projectKey,
        project.lead.name,
    ])
    const projectUris = projectsList.map(project => `/projects/${project.id}`)
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
                    Projects
                </Heading>
            </Stack>
            <LinkedTable
                headings={projectHeadings}
                rows={projects}
                uris={projectUris}
            />
        </Stack>
    )
}

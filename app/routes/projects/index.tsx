import type { LoaderFunction } from '@remix-run/node'
import type { ProjectList } from 'services/projects.server'
import { getProjectList } from 'services/projects.server'
import { useLoaderData } from '@remix-run/react'
import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import { LinkedTable } from 'components/LinkedTable'
import type { ComponentField } from 'components/types'

type LoaderData = {
    projectsList: ProjectList
}

export const loader: LoaderFunction = async () => {
    const projectsList = await getProjectList()
    return { projectsList }
}

export default function ProjectListPage() {
    const { projectsList } = useLoaderData<LoaderData>()
    const headingSize = useBreakpointValue({ base: 'lg', sm: '2xl', lg: '4xl' })
    const projectHeadings = ['Name', 'Key', 'Lead']
    const baseUrl = '/projects'
    const fields: ComponentField[] = [
        { fieldName: ['name'] },
        { fieldName: ['projectKey'] },
        { fieldName: ['lead', 'name'] },
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
                    Projects
                </Heading>
            </Stack>
            <LinkedTable
                headings={projectHeadings}
                collection={projectsList}
                baseUrl={baseUrl}
                fields={fields}
            />
        </Stack>
    )
}

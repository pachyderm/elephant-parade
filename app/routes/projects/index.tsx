import type {LoaderFunction} from '@remix-run/node'
import type {ProjectsList} from 'services/projects.server'
import {getProjectsList} from 'services/projects.server'
import {useLoaderData} from '@remix-run/react'
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

type LoaderData = {
    projectsList: ProjectsList
}

export const loader: LoaderFunction = async () => {
    const projectsList = await getProjectsList()
    return {projectsList}
}

export default function ProjectsList() {
    const {projectsList} = useLoaderData<LoaderData>()
    const headingSize = useBreakpointValue({base: 'lg', sm: '2xl', lg: '4xl'})
    return (
        <Stack
            justify='center'
            textAlign='center'
            h='100vh'
            flex={1}
            color='gray.900'
            gap={20}
        >
            <Stack gap={4} p={{base: 4, md: 8}}>
                <Heading
                    as='h2'
                    size={headingSize}
                    textTransform='uppercase'
                    color='green.400'
                >
                    Projects
                </Heading>
            </Stack>
            <TableContainer scrollBehavior={'auto'} overflowY={'auto'}>
                <Table variant={'striped'} colorScheme={'linkedin'}>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Key</Th>
                            <Th>Lead</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {projectsList.map(project => (
                            <Tr key={project.id}>
                                <Td>{project.name}</Td>
                                <Td>{project.projectKey}</Td>
                                <Td>{project.lead?.name}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Stack>
    )
}

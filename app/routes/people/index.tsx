import type {LoaderFunction} from '@remix-run/node'
import type {PeopleList} from 'services/people.server'
import {getPeopleList} from 'services/people.server'
import {useLoaderData} from '@remix-run/react'
import {Heading, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useBreakpointValue,} from '@chakra-ui/react'

type LoaderData = {
    peopleList: PeopleList
}

export const loader: LoaderFunction = async () => {
    const peopleList = await getPeopleList()
    return {peopleList}
}

export default function PeopleList() {
    const {peopleList} = useLoaderData<LoaderData>()
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
                    People
                </Heading>
            </Stack>
            <TableContainer>
                <Table variant={'striped'} colorScheme={'linkedin'}>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Company</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {peopleList.map(person => (
                            <Tr key={person.id}>
                                <Td>{person.name}</Td>
                                <Td>{person.email}</Td>
                                <Td>{person.company?.name}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Stack>
    )
}

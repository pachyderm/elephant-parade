import {
    LinkBox,
    Table,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import React from 'react'
import type { Props } from './types'
import { TableField } from 'components/TableField'

function LinkedTableComponent({
    name,
    headings,
    collection,
    fields,
    baseUrl,
}: Props) {
    const urls = collection.map(item => `${baseUrl}/${item.id}`)
    const rows = collection.map((row, index) => {
        const url = urls[index]
        return fields.map((field, index) => {
            const first = index == 0
            const item = row
            return { first, url, field, item }
        })
    })
    return (
        <TableContainer scrollBehavior={'initial'} overflowY={'auto'} flex={2}>
            {name}
            <Table variant={'striped'} colorScheme={'linkedin'} size={'sm'}>
                <Thead>
                    <Tr>
                        {headings.map((header, index) => (
                            <Th key={index}>{header}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {rows.map((row, rowIndex) => (
                        <LinkBox as={Tr} key={rowIndex}>
                            {row.map((item, itemIndex) => {
                                return <TableField {...item} key={itemIndex} />
                            })}
                        </LinkBox>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default LinkedTableComponent

import {
    LinkBox,
    LinkOverlay,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import React from 'react'
import type { Props } from './types'
import { Link as RemixLink } from '@remix-run/react/dist/components'
import invariant from 'tiny-invariant'

function LinkedTableComponent({ name, headings, rows, uris }: Props) {
    invariant(rows?.length === uris?.length, 'Rows and URIs need to match')
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
                    {rows?.map((row, rowIndex) => (
                        <LinkBox as={Tr} key={rowIndex}>
                            {row.map((item, itemIndex) => {
                                invariant(uris, 'URI Array Undefined')
                                const uri = uris[rowIndex]
                                    ? uris[rowIndex]
                                    : '.'
                                const first = itemIndex == 0
                                return (
                                    <Td key={itemIndex}>
                                        {first ? (
                                            <LinkOverlay
                                                to={`${uri}`}
                                                as={RemixLink}
                                            >
                                                {item ? item : ''}
                                            </LinkOverlay>
                                        ) : item ? (
                                            item
                                        ) : (
                                            ''
                                        )}
                                    </Td>
                                )
                            })}
                        </LinkBox>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default LinkedTableComponent

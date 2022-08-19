import { LinkOverlay, Td, Text } from '@chakra-ui/react'
import { Link as RemixLink } from '@remix-run/react/dist/components'
import React from 'react'
import type { Props } from './types'
import get from 'lodash.get'

function TableFieldComponent({ first, item, field, defaultValue, url }: Props) {
    const Component = field.Component || Text
    const value = get(item, field.fieldName, defaultValue)
    const entry = <Component>{value}</Component>
    return (
        <Td>
            {first ? (
                <LinkOverlay to={`${url}`} as={RemixLink}>
                    {entry}
                </LinkOverlay>
            ) : (
                entry
            )}
        </Td>
    )
}

export default TableFieldComponent

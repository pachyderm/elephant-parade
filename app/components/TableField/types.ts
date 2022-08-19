import type { ComponentPropsWithoutRef } from 'react'
import type { ComponentField } from 'components/types'

export type Props = ComponentPropsWithoutRef<any> & {
    url?: string
    first?: boolean
    field: ComponentField
    defaultValue?: string
}

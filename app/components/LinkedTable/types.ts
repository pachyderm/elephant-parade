import type { ComponentPropsWithoutRef } from 'react'
import type { Identifiable } from 'components/types'

export type Props = ComponentPropsWithoutRef<any> & {
    name?: string
    headings: string[]
    collection: Identifiable[]
    fields: string[][]
    baseUrl: string
}

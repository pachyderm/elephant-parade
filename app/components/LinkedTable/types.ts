import type { ComponentPropsWithoutRef } from 'react'
import type { ComponentField, Identifiable } from 'components/types'

export type Props = ComponentPropsWithoutRef<any> & {
    name?: string
    headings: string[]
    collection: Identifiable[]
    fields: ComponentField[]
    baseUrl: string
}

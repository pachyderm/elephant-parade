import type { ComponentPropsWithoutRef } from 'react'

export type Props = ComponentPropsWithoutRef<any> & {
    name?: string
    headings: string[]
    rows: (string | null | undefined)[][] | undefined
    uris: string[] | undefined
}

import type { ComponentType } from 'react'

export type Identifiable = {
    id: string
}

export type ComponentField = {
    Component?: ComponentType
    fieldName: string[]
    defaultValue?: string
}

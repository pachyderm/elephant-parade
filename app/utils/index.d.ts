import type { PrismaClient } from '@prisma/client'

/* eslint-disable no-var */

declare global {
    var __db: PrismaClient | undefined
}

export {}

import React from 'react'
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { rootAuthLoader } from '@clerk/remix/ssr.server'
import { ClerkApp, ClerkCatchBoundary } from '@clerk/remix'
import { Box, ChakraProvider, Image } from '@chakra-ui/react'
import { withEmotionCache } from '@emotion/react'
import { theme } from 'theme'
import { ServerStyleContext, ClientStyleContext } from './context'
import 'focus-visible' // Remove Chakra's outline caused by clicks

export const loader: LoaderFunction = args => rootAuthLoader(args)
export const CatchBoundary = ClerkCatchBoundary()

function App() {
    return (
        <Document>
            <ChakraProvider theme={theme}>
                <Box as='main' maxH='100vh' pos='relative'>
                    <Image
                        src='/images/logo.svg'
                        alt='Elephant Parade'
                        boxSize='auto'
                        objectFit='cover'
                        top={0}
                        zIndex={-1}
                    />
                    <Outlet />
                </Box>
            </ChakraProvider>
        </Document>
    )
}

export default ClerkApp(App)

interface DocumentProps {
    children: React.ReactNode
}

const Document = withEmotionCache(
    ({ children }: DocumentProps, emotionCache) => {
        const serverStyleData = React.useContext(ServerStyleContext)
        const clientStyleData = React.useContext(ClientStyleContext)

        // Only executed on client
        React.useEffect(() => {
            // Re-link sheet container
            emotionCache.sheet.container = document.head
            // Re-inject tags
            const tags = emotionCache.sheet.tags
            emotionCache.sheet.flush()
            tags.forEach(tag => {
                ;(emotionCache.sheet as any)._insertTag(tag)
            })
            // Reset cache to reapply global styles
            clientStyleData?.reset()
        }, [])

        return (
            <html lang='en'>
                <head>
                    <title>Elephant Parade</title>
                    <meta charSet='utf-8' />
                    <meta
                        name='viewport'
                        content='width=device-width,initial-scale=1'
                    />
                    <Meta />
                    <Links />
                    {serverStyleData?.map(({ key, ids, css }) => (
                        <style
                            key={key}
                            data-emotion={`${key} ${ids.join(' ')}`}
                            dangerouslySetInnerHTML={{ __html: css }}
                        />
                    ))}
                </head>

                <body>
                    {children}
                    <ScrollRestoration />
                    <Scripts />
                    {process.env.NODE_ENV === 'development' ? (
                        <LiveReload />
                    ) : null}
                </body>
            </html>
        )
    },
)

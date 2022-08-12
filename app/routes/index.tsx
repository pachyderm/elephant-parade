import {Link, useLoaderData} from '@remix-run/react'
import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {SignedIn, SignedOut, useAuth} from '@clerk/remix'
import {getAuth} from '@clerk/remix/ssr.server'
import {Button, Flex, Heading, Stack, useBreakpointValue,} from '@chakra-ui/react'

const dbErrorMessage =
    'Something is missing.<br/>Did you set up Supabase yet?<br/>You can find the <a href="https://github.com/clerkinc/remix-bossa-nova-stack#configuring-the-database" target="_blank">instructions in the README file</a>.'

export const loader: LoaderFunction = async ({request}) => {
    const {userId} = await getAuth(request)
    if (!userId) return null

    return json({})
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const { userId } = await getAuth(request)

    const song = formData.get('add-song')

    return null
}

export default function Index() {
    const { signOut } = useAuth()
    const data = useLoaderData()
    const headingSize = useBreakpointValue({ base: 'lg', sm: '2xl', lg: '4xl' })

    return (
        <Stack
            justify='center'
            textAlign='center'
            h='100vh'
            flex={1}
            color='white'
            gap={20}
        >
            <Stack gap={4} p={{ base: 4, md: 8 }}>
                <Heading
                    as='h1'
                    size={headingSize}
                    textTransform='uppercase'
                    color='green.400'
                >
                    Elephant Parade
                </Heading>

                <SignedOut>
                    <Flex justify='center' gap={4}>
                        <Button as={Link} to='/sign-in' bg='gray.500'>
                            Sign in
                        </Button>

                        <Button as={Link} to='/sign-up'>
                            Sign up
                        </Button>
                    </Flex>
                </SignedOut>

                <SignedIn>
                    <Stack align='center' gap={4}>
                        <Button onClick={() => signOut()} bg='gray.500'>
                            Sign out
                        </Button>
                    </Stack>
                </SignedIn>
            </Stack>
        </Stack>
    )
}

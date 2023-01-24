import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Stack,
    Avatar, AvatarBadge, AvatarGroup, Wrap, WrapItem, Text, Spacer, Icon, Box,
    useColorModeValue,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { FcBookmark, FcFeedback, FcSettings } from 'react-icons/fc'
import { GlobalContext } from '../../context/context'

export default function CDrawer() {
    const { state } = useContext(GlobalContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sec_c = useColorModeValue('white', 'gray.800')

    return (
        <>
            <Button
                bg='orange.400'
                color={sec_c}
                _hover={{
                    bg: `orange.600`,
                }}
                mt={5} ml={5}
                p={"0"} w={"10"} h={"10"} borderRadius={"full"}
                onClick={onOpen}  >
                <BiMenuAltLeft size={"18"} />
            </Button>

            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <Stack >
                        <DrawerCloseButton mt={3.5} />
                        <DrawerHeader borderBottomWidth='1px'>Education {' '}
                            <Text as={'span'} color={'orange.600'}>
                                Portal
                            </Text></DrawerHeader>
                    </Stack>
                    <DrawerBody>

                        <Stack spacing={2} align='center'>

                            <Button width={'full'} justifyContent='flex-start' variant='ghost'>
                                <Box width={10} >
                                    <Avatar size={'sm'} name={state?.user?.firstName} src={state?.user?.profilePhoto || 'https://avatars.dicebear.com/api/male/username.svg'} />
                                </Box>
                                <Text ml={2} >{state?.user?.firstName} {state?.user?.lastName}</Text>
                            </Button>
                            <Button width={'full'} justifyContent='flex-start' variant='ghost'>
                                <Box width={10} >
                                    <Icon as={FcBookmark} boxSize={6} />
                                </Box>
                                <Text ml={2} >My Bookmark</Text>
                            </Button>

                            <Button width={'full'} justifyContent='flex-start' variant='ghost'>
                                <Box width={10} >
                                    <Icon as={FcSettings} boxSize={6} />
                                </Box>
                                Setting
                            </Button>
                            <Button width={'full'} justifyContent='flex-start' variant='ghost'>
                                <Box width={10} >
                                    <Icon as={FcFeedback} boxSize={6} />
                                </Box>
                                Feedback
                            </Button>
                        </Stack>



                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
import {
  Box,
  Flex,
  VStack,
  Text,
  Link,
  MenuButton,
  Menu,
  MenuList,
  Portal,
  MenuItem,
  useToast,
} from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/avatar'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'

const UserHeader = () => {
  const toast = useToast()

  const copyURL = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: 'Link Copied',
        description: '' + currentURL + ' copied to clipboard',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
  }

  return (
    <VStack gap={4} alignItems={'start'}>
      <Flex justifyContent={'space-between'} w={'full'}>
        <Box>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            Sejlana Kisnyuszi
          </Text>
          <Flex gap={2} alignItems={'center'}>
            <Text fontSize={'sm'}>sejlanakisnyuszi</Text>
            <Text
              fontSize={{
                base: 'xs',
                md: 'sm',
              }}
              bg={'gray.dark'}
              color={'gray.light'}
              p={1}
              borderRadius={'full'}
            >
              threads.next
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            name="Sejlana Kisnyuszi"
            src="/avatar.jpeg"
            size={{
              base: 'md',
              md: 'xl',
            }}
          />
        </Box>
      </Flex>

      <Text>founder of Sejlana, best selling author, and philanthropist</Text>
      <Flex w={'full'} justifyContent={'space-between'}>
        <Flex gap={'2'} alignItems={'center'}>
          <Text color={'gray.light'}>3.4 K followers</Text>
          <Box w="1" h="1" bg={'gray.light'} borderRadius={'full'}></Box>
          <Link color={'gray.light'}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor="pointer" />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor="pointer" />
              </MenuButton>
              <Portal>
                <MenuList bg={'gray.dark'}>
                  <MenuItem bg={'gray.dark'} onClick={copyURL}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={'full'}>
        <Flex
          flex={1}
          borderBottom={'1.5px solid white'}
          cursor={'pointer'}
          justifyContent={'center'}
          pb="3"
        >
          <Text fontWeight={'bold'}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={'1px solid gray'}
          color={'gray.light'}
          cursor={'pointer'}
          justifyContent={'center'}
          pb="3"
        >
          <Text fontWeight={'bold'}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  )
}

export default UserHeader

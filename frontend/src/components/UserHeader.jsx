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
  Button,
} from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/avatar'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import useShowToast from '../hooks/useShowToast'

const UserHeader = ({ user }) => {
  const toast = useToast()
  const currentUser = useRecoilValue(userAtom)
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id),
  )
  const Toast = useShowToast()
  const [loading, setLoading] = useState(false)

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

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      Toast('Error', 'Please login to follow', 'error')
      return
    }
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (data.error) {
        Toast('Error', data.error, 'error')
        return
      }
      if (following) {
        Toast('Success', `Unfollowed ${user.name}`, 'success')
        user.followers.pop()
      } else {
        Toast('Success', `Followed ${user.name}`, 'success')
        user.followers.push(currentUser?._id)
      }
      setFollowing(!following)
    } catch (error) {
      Toast('Error', error, 'error')
    } finally {
      setLoading(false)
    }
  }
  return (
    <VStack gap={4} alignItems={'start'}>
      <Flex justifyContent={'space-between'} w={'full'}>
        <Box>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={'center'}>
            <Text fontSize={'sm'}>{user.username}</Text>
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
          {user.profilePic && (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{
                base: 'md',
                md: 'xl',
              }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              src="https://bit.ly/broken-link"
              size={{
                base: 'md',
                md: 'xl',
              }}
            />
          )}
        </Box>
      </Flex>

      <Text>{user.bio}</Text>
      {currentUser?._id === user._id && (
        <Link as={RouterLink} to="/update">
          <Button size="sm">Edit Profile</Button>
        </Link>
      )}
      {currentUser?._id !== user._id && (
        <Button size="sm" onClick={handleFollowUnfollow} isLoading={loading}>
          {following ? 'Unfollow' : 'Follow'}
        </Button>
      )}
      <Flex w={'full'} justifyContent={'space-between'}>
        <Flex gap={'2'} alignItems={'center'}>
          <Text color={'gray.light'}>{user.followers.length} followers</Text>
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

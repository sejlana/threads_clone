import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import { useState } from 'react'
import Comments from '../components/Comments'

const PostPage = () => {
  const [liked, setLiked] = useState(false)

  return (
    <>
      <Flex w={'full'} alignItems={'center'} gap={3}>
        <Avatar src="/avatar.jpeg" size={'md'} name="Kisnyuszi" />
        <Flex>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            Sejlanakisnyuszi
          </Text>
          <Image src="/verified.png" alt="verified" w={4} h={4} ml={1} />
        </Flex>
        <Flex gap={4} alignItems={'center'}>
          <Text fontSize={'sm'} color={'gray.light'}>
            1h
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Malacpuminyuszi</Text>
      <Box
        borderRadius={6}
        overflow={'hidden'}
        border={'1px solid'}
        borderColor={'gray.light'}
      >
        <Image src="/post1.jpeg" w={'full'} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={'center'}>
        <Text color={'gray.light'} fontSize={'sm'}>
          238 Replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
        <Text color={'gray.light'} fontSize={'sm'}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text fontSize={'2xl'}>👋</Text>
          <Text color={'gray.light'}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      <Comments
        comment="looks good"
        createdAt="2d"
        likes={100}
        username="johndoe"
        userAvatar="https://bit.ly/dan/abramov"
      />
      <Comments
        comment="amazing"
        createdAt="2d"
        likes={100}
        username="sallyndoe"
        userAvatar="https://bit.ly/dan/abramov"
      />
      <Comments
        comment="looks super good"
        createdAt="2d"
        likes={100}
        username="janendoe"
        userAvatar="https://bit.ly/dan/abramov"
      />
    </>
  )
}

export default PostPage

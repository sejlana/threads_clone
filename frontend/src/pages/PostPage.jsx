import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react'

import Actions from '../components/Actions'
import { useEffect, useState } from 'react'
import Comments from '../components/Comments'
import useGetUserProfile from '../hooks/useGetUserProfile'
import useShowToast from '../hooks/useShowToast'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { DeleteIcon } from '@chakra-ui/icons'
import userAtom from '../atoms/userAtom'
import { useRecoilValue } from 'recoil'

const PostPage = () => {
  const { user, loading } = useGetUserProfile()
  const [post, setPost] = useState(null)
  const Toast = useShowToast()
  const { pid } = useParams()
  const currentUser = useRecoilValue(userAtom)
  const navigate = useNavigate

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`)
        const data = await res.json()
        if (data.error) {
          Toast('Error', data.error, 'error')
          return
        }
        console.log(data)
        setPost(data)
      } catch (err) {
        Toast('Error', error.message, 'error')
      }
    }
    getPost()
  }, [Toast, pid])

  const handleDeletePost = async () => {
    try {
      e.preventDefault()
      if (!window.confirm('Are you sure you want to delete this post?')) return

      const res = await fetch(`/api/posts/${post._id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.error) {
        Toast('Error', data.error, 'error')
        return
      }
      Toast('Success', 'Post deleted', 'success')
      navigate(`/${user.username}`)
    } catch (error) {
      Toast('Error', error.message, 'error')
    }
  }

  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    )
  }
  if (!post) return null

  return (
    <>
      <Flex w={'full'} alignItems={'center'} gap={3}>
        <Avatar src={user.profilePic} size={'md'} name="Kisnyuszi" />
        <Flex>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {user.username}
          </Text>
          <Image src="/verified.png" alt="verified" w={4} h={4} ml={1} />
        </Flex>
        <Flex gap={4} alignItems={'center'}>
          <Text
            fontSize={'xs'}
            width={36}
            textAlign={'right'}
            color={'gray.light'}
          >
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>

          {currentUser?._id === user._id && (
            <DeleteIcon
              size={20}
              cursor={'pointer'}
              onClick={handleDeletePost}
            />
          )}
        </Flex>
      </Flex>
      <Text my={3}>{post.text}</Text>
      {post.img && (
        <Box
          borderRadius={6}
          overflow={'hidden'}
          border={'1px solid'}
          borderColor={'gray.light'}
        >
          <Image src={post.img} w={'full'} />
        </Box>
      )}
      <Flex gap={3} my={3}>
        <Actions post={post} />
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
      {post.replies.map((reply) => (
        <Comments
          key={reply._id}
          reply={reply}
          lastReply={reply._id === post.replies[post.replies.length - 1]._id}
        />
      ))}
    </>
  )
}

export default PostPage

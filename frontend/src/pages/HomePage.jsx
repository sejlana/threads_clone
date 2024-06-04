import { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import { Flex, Spinner } from '@chakra-ui/react'
import Post from '../components/Post'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const Toast = useShowToast()

  useEffect(() => {
    const fetchFeedPosts = async () => {
      try {
        const res = await fetch('/api/posts/feed')
        const data = await res.json()
        if (data.error) {
          Toast('Error', data.error, 'error')
          return
        }
        console.log(data)
        setPosts(data)
      } catch (error) {
        Toast('Error', error.message, 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchFeedPosts()
  }, [Toast])
  return (
    <>
      {loading && (
        <Flex justify="center">
          <Spinner size="xl" />
        </Flex>
      )}
      {!loading && posts.length === 0 && (
        <h1>No posts to show, follow a user to see Feed Posts</h1>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  )
}

export default HomePage

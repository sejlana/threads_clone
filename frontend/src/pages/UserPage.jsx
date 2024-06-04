import { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import { Flex, Spinner } from '@chakra-ui/react'
import Post from '../components/Post'

const UserPage = () => {
  const [user, setUser] = useState(null)
  const { username } = useParams()
  const Toast = useShowToast()
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json()
        if (data.error) {
          Toast('Error', data.error, 'error')
        }
        setUser(data)
      } catch (error) {
        Toast('Error', error.message, 'error')
      } finally {
        setLoading(false)
      }
    }

    const getUserPosts = async () => {
      setLoadingPosts(true)
      try {
        const res = await fetch(`/api/posts/user/${username}`)
        const data = await res.json()
        console.log(data)
        setPosts(data)
      } catch (error) {
        Toast('Error', error.message, 'error')
        setPosts([])
      } finally {
        setLoadingPosts(false)
      }
    }
    getUser()
    getUserPosts()
  }, [username, Toast])
  if (!user && loading) {
    return (
      <Flex justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    )
  }

  if (!user && !loading) return <h1>User not found</h1>

  return (
    <>
      <UserHeader user={user} />
      {!loadingPosts && posts.length === 0 && (
        <h1>No posts to show from this User</h1>
      )}
      {loadingPosts && (
        <Flex justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  )
}

export default UserPage

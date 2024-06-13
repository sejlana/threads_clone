import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useShowToast from './useShowToast'

const useGetUserProfile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { username } = useParams()
  const Toast = useShowToast()

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json()
        if (data.error) {
          Toast('Error', data.error, 'error')
          return
        }
        if (data.isFrozen) {
          setUser(null)
          return
        }
        setUser(data)
      } catch (error) {
        Toast('Error', error.message, 'error')
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [username, Toast])

  return { loading, user }
}

export default useGetUserProfile

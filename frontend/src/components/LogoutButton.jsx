import { Button } from '@chakra-ui/react'
import userAtom from '../atoms/userAtom'
import { useSetRecoilState } from 'recoil'
import useShowToast from '../hooks/useShowToast'

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom)
  const toast = useShowToast()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      if (data.error) {
        toast('Error', data.error, 'error')
        return
      }

      localStorage.removeItem('user-threads')
      setUser(null)
    } catch (error) {
      toast('Error', error, 'error')
    }
  }

  return (
    <Button
      position={'fixed'}
      top={'30px'}
      right={'30px'}
      size={'sm'}
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}

export default LogoutButton

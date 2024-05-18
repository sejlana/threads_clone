import authScreenAtom from '../atoms/authAtom'
import LoginCard from '../components/LoginCard'
import SignupCard from '../components/SignUpCard'
import { useRecoilValue } from 'recoil'

const AuthPAge = () => {
  const authScreenState = useRecoilValue(authScreenAtom)
  return <>{authScreenState === 'login' ? <LoginCard /> : <SignupCard />}</>
}

export default AuthPAge

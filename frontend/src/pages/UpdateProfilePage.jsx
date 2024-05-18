import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    
    Center,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useRef, useState } from 'react';
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';

  
  export default function UpdateProfilePage() {
    
    const [user, setUser] = useRecoilState(userAtom)
    const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    password: '',
    })
    const fileRef = useRef(null)
    const { handleImageChange, imgUrl } = usePreviewImg()
    const Toast = useShowToast()

    const handleSubmit = async (e) => {
    try{ console.log(inputs)

    } catch (error) {
        Toast('Error', error.message, 'error')
    } }
  


    return (
      <form onSubmit={handleSubmit}>
      <Flex
        align={'center'}
        justify={'center'}
        my={6}
       >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'dark.gray')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" boxShadow={'md'} src={imgUrl || user.profilePic} />
                  
                
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>Change Avatar</Button>
                <Input type='file' hidden ref={fileRef} onChange={handleImageChange}/>
              </Center>
            </Stack>
          </FormControl>
          <FormControl >
            <FormLabel>Username</FormLabel>
            <Input
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              placeholder="UserName"
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl >
            <FormLabel>Full Name</FormLabel>
            <Input
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              placeholder="Full Name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl >
            <FormLabel>Bio</FormLabel>
            <Input
              value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              placeholder="Your Bio"
              _placeholder={{ color: 'gray.500' }}
              type="text"
            /></FormControl>
          
          <FormControl >
            <FormLabel>Email address</FormLabel>
            <Input
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl >
            <FormLabel>Password</FormLabel>
            <Input
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              placeholder="Password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'green.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'green.500',
              }}
              type='submit'>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
      </form>
    );
  }
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={481}
        postImg="/post1.jpeg"
        postTitle="malac1"
      />
      <UserPost
        likes={1270}
        replies={45}
        postImg="/post2.jpeg"
        postTitle="malac2"
      />
      <UserPost likes={1260} replies={431} postTitle="malac3" />
    </>
  )
}

export default UserPage

import { useParams } from 'react-router-dom'

const UserPage = () => {
  const { username } = useParams()

  return (
    <div>
      User page for {username}
    </div>
  );
};

export default UserPage;
import  { useState, useEffect, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import "./profile.scss";
import Posts from '../../components/posts/posts';
import { FacebookTwoTone, LinkedIn, Instagram, Pinterest, X, Place, Language, EmailOutlined, MoreVert } from '@mui/icons-material';

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const userId = parseInt(useLocation().pathname.split('/')[2], 10);
  
  const [isFollowing, setIsFollowing] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await makeRequest.get(`/users/find/${userId}`);
      return response.data;
    },
    onError: (err) => console.error('Fetch error:', err),
  });

  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ['relationship', userId],
    queryFn: async () => {
      const response = await makeRequest.get(`/relationships/${userId}`);
      return response.data;
    },
    onError: (err) => console.error('Fetch error:', err),
  });

  useEffect(() => {
    if (relationshipData) {
      setIsFollowing(relationshipData.includes(currentUser.id));
    }
  }, [relationshipData, currentUser.id]);

  const handleFollow = async () => {
    if (!currentUser?.id || !userId) {
      console.error('User or target user ID is undefined');
      return;
    }

    try {
      if (isFollowing) {
        await makeRequest.delete('/relationships', {
          data: { followerUserId: currentUser.id, followedUserId: userId },
        });
        setIsFollowing(false);
      } else {
        await makeRequest.post('/relationships', {
          followerUserId: currentUser.id,
          followedUserId: userId,
        });
        setIsFollowing(true);
      }
      queryClient.invalidateQueries(['relationship', userId]);
    } catch (err) {
      console.error('Error updating relationship:', err.response?.data || err.message);
    }
  };

  if (isLoading || rIsLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error loading profile</div>;
  }

  return (
    <section className="profile-section">
      <div className="images">
        <img className="cover" src={data.coverPic} alt="" />
        <img className="profile-image" src={data.profilePic} alt="" />
      </div>
      <div className="profile-container">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoTone fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <LinkedIn fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <Instagram fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <Pinterest fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <X fontSize="medium" />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <Place />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <Language />
                <span>{data.website}</span>
              </div>
            </div>
            {userId === currentUser.id ? (
              <button>Update</button>
            ) : (
              <button onClick={handleFollow}>
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlined />
            <MoreVert />
          </div>
        </div>
      </div>
      {/* Pass the userId to fetch posts specific to this user */}
      <Posts userId={userId} />
    </section>
  );
};

export default ProfilePage;

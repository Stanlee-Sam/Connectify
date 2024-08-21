import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./leftBar.scss";
import { useNavigate } from "react-router-dom";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log('Current User:', currentUser);
  const handleProfile = () => {
    navigate(`/profile/${currentUser.id}`);  }

  // Fallback URL for profile picture if currentUser.profilePic is null
  const profilePicUrl = currentUser?.profilePic 
    ? `/assets/${currentUser.profilePic}` 
    : '/public/Profile.jpeg';

  return (
    <section className="leftbar-section">
      <div className="container">
        <div className="menu">
          <div className="user">
            {currentUser ? (
              <>
              <div className="leftbar-profile" onClick={handleProfile}>
              <div>
              <img className="profile-image" src={profilePicUrl} alt="" />
              </div>
              <div>
              <span>{currentUser.name || 'Guest'}</span>
              </div>
                
              </div>
                
              </>
            ) : (
              <span>Loading...</span> // Provide a fallback if currentUser is not yet available
            )}
          </div>
          {/* Menu items with placeholder icons */}
          <div className="item">
            <img src="../../../src/assets/Friends.jpeg" alt="Friends" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src="../../../src/assets/Groups.jpeg" alt="Groups" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src="../../../src/assets/Marketplace.jpeg" alt="Marketplace" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src="../../../src/assets/Watch.jpeg" alt="Watch" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src="../../../src/assets/Memories.jpeg" alt="Memories" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your Shortcuts</span>
          <div className="item">
            <img src="../../../src/assets/Events.jpeg" alt="Events" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src="../../../src/assets/Gaming.jpeg" alt="Gaming" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src="../../../src/assets/Anime.jpeg" alt="Anime" />
            <span>Anime</span>
          </div>
          <div className="item">
            <img src="../../../src/assets/Videos.jpeg" alt="Videos" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src="../../../src/assets/Messages.jpeg" alt="Messages" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src="../../../src/assets/Fundraiser.jpeg" alt="Fundraiser" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src="../../../src/assets/Tutorial.jpeg" alt="Tutorial" />
            <span>Tutorial</span>
          </div>
          <div className="item">
            <img src="../../../src/assets/Courses.jpeg" alt="Courses" />
            <span>Courses</span>
          </div>
        </div>
        <hr />
      </div>
    </section>
  );
};

export default LeftBar;

import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./leftBar.scss";
import { useNavigate } from "react-router-dom";
import Friends from "../../../src/assets/Friends.jpeg"
import Groups from "../../../src/assets/Groups.jpeg"
import MarketPlace from "../../../src/assets/Marketplace.jpeg"
import Watch from "../../../src/assets/Watch.jpeg"
import Memories from "../../../src/assets/Memories.jpeg"
import Events from "../../../src/assets/Events.jpeg"
import Gaming from "../../../src/assets/Gaming.jpeg"
import Anime from "../../../src/assets/Anime.jpeg"
import Videos from "../../../src/assets/Videos.jpeg"
import Messages from "../../../src/assets/Messages.jpeg"
import Fundraiser from "../../../src/assets/Fundraiser.jpeg"
import Tutorial from "../../../src/assets/Tutorial.jpeg"
import Courses from "../../../src/assets/Courses.jpeg"

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log('Current User:', currentUser);
  const handleProfile = () => {
    navigate(`/profile/${currentUser.id}`);  }

  // Fallback URL for profile picture if currentUser.profilePic is null
  const profilePicUrl = currentUser?.profilePic 
    ? `/assets/${currentUser.profilePic}` 
    : '/assets/Profile.jpeg';

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
            <img src={Friends} alt="Friends" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="Groups" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={MarketPlace} alt="Marketplace" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="Watch" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="Memories" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your Shortcuts</span>
          <div className="item">
            <img src={Events} alt="Events" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="Gaming" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Anime} alt="Anime" />
            <span>Anime</span>
          </div>
          <div className="item">
            <img src={Videos} alt="Videos" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="Messages" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fundraiser} alt="Fundraiser" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorial} alt="Tutorial" />
            <span>Tutorial</span>
          </div>
          <div className="item">
            <img src={Courses} alt="Courses" />
            <span>Courses</span>
          </div>
        </div>
        <hr />
      </div>
    </section>
  );
};

export default LeftBar;

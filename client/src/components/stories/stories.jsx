// import { useContext } from "react";
import "./strories.css";
// import { AuthContext } from "../../context/authContext";

const Stories = () => {
    // const {currentUser} = useContext(AuthContext)
  const currentUser = {
    name: "Jay Gerrick",
    profilePic: "../../src/assets/WhatsApp Image 2023-02-24 at 22.49.24.jpg",
  };
  const stories = [
    {
      id: 1,
      name: "Will J",
      img: "../../src/assets/★.jpeg",
    },
    {
      id: 2,
      name: "Symere Woods",
      img: "../../src/assets/Symere.jpeg",
    },
    {
      id: 3,
      name: "Jay Gerrick",
      img: "../../src/assets/Positive.jpeg",
    },
    {
      id: 4,
      name: "Carl Johnson",
      img: "../../src/assets/Game.jpeg",
    },
    
    
  ];
  return (
    <section className="stories-section">
      <div key={currentUser.id} className="story">
        <img src={currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>

      {stories.map((story) => (
        <div key={story.id} className="story">
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </section>
  );
};
export default Stories;

import "./strories.css";
import Will from "../../../src/assets/★.jpeg";
import Symere from "../../../src/assets/Symere.jpeg";
import Jay from "../../../src/assets/Positive.jpeg";
import Carl from "../../../src/assets/Game.jpeg";
import Profile from "../../../src/assets/WhatsApp Image 2023-02-24 at 22.49.24.jpg";

const Stories = () => {
  // const {currentUser} = useContext(AuthContext)
  const currentUser = {
    name: "Jay Gerrick",
    profilePic: Profile,
  };
  const stories = [
    {
      id: 1,
      name: "Will J",
      img: Will,
    },
    {
      id: 2,
      name: "Symere Woods",
      img: Symere,
    },
    {
      id: 3,
      name: "Jay Gerrick",
      img: Jay,
    },
    {
      id: 4,
      name: "Carl Johnson",
      img: Carl,
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

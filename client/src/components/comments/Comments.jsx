import { useContext } from "react";
import "./Comments.scss";
import { AuthContext } from "../../context/authContext";

const Comments = () => {
  const currentUser = useContext(AuthContext);
  const comments = [
    {
      id: 1,
      name: "John Doe",
      desc: "This is a great post!",
      userId: 1,
      profilePicture: "/src/assets/WhatsApp Image 2023-02-24 at 22.49.24.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      desc: "This is a great post!",
      userId: 1,
      profilePicture: "/src/assets/WhatsApp Image 2023-02-24 at 22.49.24.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      desc: "This is a great post!",
      userId: 1,
      profilePicture: "/src/assets/WhatsApp Image 2023-02-24 at 22.49.24.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      desc: "This is a great post!",
      userId: 1,
      profilePicture: "/src/assets/WhatsApp Image 2023-02-24 at 22.49.24.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      desc: "This is a great post!",
      userId: 1,
      profilePicture: "/src/assets/WhatsApp Image 2023-02-24 at 22.49.24.jpg",
    },
  ];

  return (
    <section className="comment-section">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />

        <input placeholder="Write a comment..." />
        <button>Post</button>
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <img src={comment.profilePicture} alt={comment.name} />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>

          <span className="date">1 hour ago</span>
        </div>
      ))}
    </section>
  );
};

export default Comments;

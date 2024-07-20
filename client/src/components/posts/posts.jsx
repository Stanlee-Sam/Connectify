import './posts.css';
import Post from '../../components/post/Post.jsx';

const Posts = () => {
  const posts = [
    {
      id: 1,
      userId: 1,
      profilePic: "/src/assets/WhatsApp Image 2023-02-24 at 22.49.24.jpg", 
      desc: "This is the first post content",
      name: "John Doe",
      img: "/src/assets/WhatsApp Image 2023-02-24 at 22.49.24.jpg" 
    },
    {
      id: 2,
      userId: 2,
      profilePic: "/src/assets/WhatsApp Image 2023-02-24 at 22.49.24.jpg", // Update path if necessary
      desc: "This is the second post content",
      name: "Jane Smith"
    }
  ];

  return (
    <section className="posts-section">
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </section>
  );
};

export default Posts;

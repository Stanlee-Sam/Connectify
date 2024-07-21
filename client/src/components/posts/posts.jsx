import './posts.css';
import Post from '../../components/post/Post.jsx';
import {
  useQuery
} from '@tanstack/react-query'
import { makeRequest } from '../../axios';

const Posts = () => {
  const { isLoading, error, data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makeRequest.get("/posts").then((res) => res.data),
    onError: (err) => console.error('Fetch error:', err),
  });
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  if (posts.length === 0) return <div>No posts available</div>;

  return (
    <section className="posts-section">
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </section>
  );
};

export default Posts;

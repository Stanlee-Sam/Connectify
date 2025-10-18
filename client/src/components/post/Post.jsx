import "./Post.scss";
import { Link } from "react-router-dom";
import { FavoriteBorderOutlined, MoreHoriz } from "@mui/icons-material";
import { FavoriteOutlined } from "@mui/icons-material";
import { Textsms } from "@mui/icons-material";
import { ShareOutlined } from "@mui/icons-material";
import Comments from "../../components/comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: async () => {
      const response = await makeRequest.get(`/like/${post.id}/likes`);
      console.log("Api Response", response.data);
      return response.data;
    },
    onError: (err) => console.error("Fetch error:", err),
  });

  const { data: commentsData } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: async () => {
      const response = await makeRequest.get(`/comments/${post.id}`);
      return response.data;
    },
    onError: (err) => console.error("Fetch error:", err),
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      return await makeRequest.post(`/like/${post.id}/like`, {
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post.id]);
    },
    onError: (err) => {
      console.error("Error liking post:", err);
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: async () => {
      await makeRequest.delete(`/like/${post.id}/dislike`, {
        data: { userId: currentUser.id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post.id]);
    },
    onError: (err) => console.error("Error disliking post:", err),
  });
const deletePostMutation = useMutation({
    mutationFn: async () => {
      await makeRequest.delete(`/posts/${post.id}/delete`, {
        data: { userId: currentUser.id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", post.id]);
    },
    onError: (err) => console.error("Error deleting post:", err),
  });

  const handleLike = async () => {
    console.log("Liking post with ID:", post.id);
    console.log("Current User ID:", currentUser.id);
    console.log("Attempting to like post", post.id);
    likeMutation.mutate(undefined, {
      onSuccess: () => {
        console.log("Successfully liked post", post.id);
      },
      onError: (err) => {
        console.error("Error liking post:", err);
      },
    });
  };
  const handleDislike = async () => {
    dislikeMutation.mutate();
  };

  const deletePost = async () => {
    console.log("Deleting post with ID:", post.id);
    deletePostMutation.mutate();
  }

  const hasLiked = data?.some((like) => like.userId === currentUser.id);
  const likesCount = data?.length || 0;
  const commentsCount = commentsData?.length || 0;

  const imageUrl = `/assets/${post.img}`;

  console.log("Image URL:", imageUrl);

  const profilePicUrl = post.profilePic 
  ? `/assets/${post.profilePic}` 
    : '/assets/Profile.jpeg';

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading likes</p>;

  return (
    <section className="post-section">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={profilePicUrl} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHoriz onClick = {()=>setMenuOpen(!menuOpen)}/>
            {menuOpen && post.userId === currentUser.id && (<button className= "deleteBtn" onClick={deletePost}>Delete</button>)}
        </div>
        <div className="content">
          <p>{post.desc}</p>

          {post.img && <img src={`/assets/${post.img}`} alt="Post" />}
        </div>
        <div className="info">
          <div className="item" onClick={hasLiked ? handleDislike : handleLike}>
            {hasLiked ? (
              <FavoriteOutlined style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
            {likesCount} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <Textsms />
            {commentsCount} Comments
          </div>
          <div className="item">
            <ShareOutlined />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </section>
  );
};
Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profilePic: PropTypes.string,
    desc: PropTypes.string.isRequired,
    img: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};
export default Post;

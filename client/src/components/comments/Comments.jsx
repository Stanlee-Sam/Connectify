import { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./Comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext); // Ensure currentUser is used from context
  const [newComment, setNewComment] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const response = await makeRequest.get(`/comments/${postId}`);
      console.log("Api Response", response.data);
      return response.data;
    },
    onError: (err) => console.error("Fetch error:", err),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Current User:", currentUser); 

    if (newComment.trim()) {
      const userId = currentUser?.id;

      if (!userId) {
        console.error('User ID is undefined');
        return;
      }

      try {
        const payload = {
          desc: newComment,
          userId: userId, 
          postId: postId,
        };

        console.log('Posting comment with payload:', payload);

        const response = await makeRequest.post('/comments', payload);
        console.log('Comment posted successfully:', response.data);

        setNewComment('');
        queryClient.invalidateQueries(['comments', postId]);
      } catch (err) {
        console.error('Error adding comment:', err.response ? err.response.data : err.message);
      }
    } else {
      console.warn('Comment cannot be empty');
    }
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments</p>;

  return (
    <section className="comment-section">
      <div className="write">
        <img src={currentUser?.profilePic || "/default-profile-pic.png"} alt="" />
        <input
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleSubmit}>Post</button>
      </div>
      {data.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        data.map((comment) => (
          <div key={comment.id} className="comment">
            <img src={comment.profilePic || "/default-profile-pic.png"} alt={comment.name} />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))
      )}
    </section>
  );
};

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default Comments;

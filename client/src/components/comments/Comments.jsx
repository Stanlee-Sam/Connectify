import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import "./Comments.css";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
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
        console.error("User ID is undefined");
        return;
      }

      try {
        const payload = {
          desc: newComment,
          userId: userId,
          postId: postId,
        };

        console.log("Posting comment with payload:", payload);

        const response = await makeRequest.post("/comments", payload);
        console.log("Comment posted successfully:", response.data);

        setNewComment("");
        queryClient.invalidateQueries(["comments", postId]);
      } catch (err) {
        console.error(
          "Error adding comment:",
          err.response ? err.response.data : err.message
        );
      }
    } else {
      console.warn("Comment cannot be empty");
    }
  };
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId) => {
      await makeRequest.delete(`/comments/${commentId}`, {
        data: { userId: currentUser.id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: (err) => console.error("Error deleting comment:", err),
  });

  const deleteComment = async (commentId) => {
    console.log("Deleting comment with ID:", commentId);
    deleteCommentMutation.mutate(commentId);
  };

  if (isLoading) return <p>Loading comments...</p>;

  const comments = data || [];
  
  return (
    <section className="comment-section">
      <div className="comment-section-write">
        <img src={currentUser?.profilePic ? `/assets/${currentUser.profilePic}` : '/public/Profile.jpeg'} alt="" />
        <input
          className="comment-section-input"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-section-button" onClick={handleSubmit}>
          Post
        </button>
      </div>
      {comments.length === 0 ? (
        <p className="comment-section-no-comments">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        comments.map((comment) => {
          const authorProfilePicUrl = comment.user?.profilePic 
            ? `/assets/${comment.user.profilePic}` 
            : '/public/Profile.jpeg';

            return (
              
                <div key={comment.id} className="comment-section-comment">
                  <img className="profile-image" src={authorProfilePicUrl} alt="" />
                  <div className="comment-section-info">
                    <span className="comment-section-name">{comment.name}</span>
                    <p
                      className="comment-section-desc"
                      onClick={() =>
                        setMenuOpen(menuOpen === comment.id ? null : comment.id)
                      }
                    >
                      {comment.desc}
                    </p>
                    {menuOpen === comment.id && comment.userId === currentUser.id && (
                      <button
                        className="deleteBtn"
                        onClick={() => deleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <span className="comment-section-date">
                    {moment(comment.createdAt).fromNow()}
                  </span>
                </div>
              
            )

          }) 
      )}
    </section>
  );
};

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default Comments;

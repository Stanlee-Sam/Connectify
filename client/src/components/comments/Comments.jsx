import { useContext } from "react";
import PropTypes from "prop-types";
import "./Comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const currentUser = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const response = await makeRequest.get(`/comments/${postId}`);
      console.log("Api Response", response.data);
      return response.data;
    },
    onError: (err) => console.error("Fetch error:", err),
  });

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments</p>;

  return (
    <section className="comment-section">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input placeholder="Write a comment..." />
        <button>Post</button>
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
            <span className="date">
              {moment(comment.createdAt).fromNow()}
            </span>
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

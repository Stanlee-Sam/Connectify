import "./Share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const { currentUser } = useContext(AuthContext);

  console.log("Current User:", currentUser);

  useEffect(() => {
    const uploadFile = async () => {
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await makeRequest.post("/upload", formData);
          console.log(res.data);
          setImgUrl(res.data);
        } catch (err) {
          console.log(err);
          setError(err);
        }
      }
    };

    uploadFile();
  }, [file]);

  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const postData = {
      userId: currentUser?.id, 
      desc,
      img: imgUrl,
      name: currentUser?.name || '', 
      profilePic: currentUser?.profilePic || '' 
    };

    console.log("Posting data:", postData);

    if (!postData.userId || !postData.desc || !postData.name) {
      setError("Missing required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      await makeRequest.post("/posts", postData);
      setDesc("");
      setFile(null);
      setImgUrl("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  const profilePicUrl = currentUser?.profilePic 
    ? `/assets/${currentUser.profilePic}` 
    : '/defaultProfilePic.jpg';

  return (
    <div className="share">
      <div className="share-container">
        <div className="share-top">
          <div className="share-left">
          <img className="profile-image" src={profilePicUrl} alt="" />
          <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="share-right">
            {file && (
              <img className="share-file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="share-bottom">
          <div className="share-left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="share-item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="share-item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="share-item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="share-right">
            <button onClick={handleClick} disabled={isSubmitting}>
              Share
            </button>
          </div>
        </div>
        {error && <div className="share-error">Error: {error.message}</div>}
      </div>
    </div>
  );
};

export default Share;

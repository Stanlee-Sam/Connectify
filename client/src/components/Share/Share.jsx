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
  
    // Construct postData with currentUser data
    const postData = {
      userId: currentUser?.id, // Use 'id' from currentUser
      desc,
      img: imgUrl,
      name: currentUser?.name || '', // Provide default if missing
      profilePic: currentUser?.profilePic || '' // Provide default if missing
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
  
  

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick} disabled={isSubmitting}>
              Share
            </button>
          </div>
        </div>
        {error && <div className="error">Error: {error.message}</div>}
      </div>
    </div>
  );
};

export default Share;

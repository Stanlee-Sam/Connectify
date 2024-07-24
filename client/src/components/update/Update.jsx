import { useState, useContext } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: user.name || "",
    city: user.city || "",
    website: user.website || "",
  });

  const queryClient = useQueryClient();
  const { updateUser } = useContext(AuthContext);

  const upload = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await makeRequest.post("/upload", formData);
        console.log("Upload response:", res.data);
        return res.data;
      } catch (err) {
        console.log("Upload error:", err);
      }
    }
    return null;
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl = user.coverPic;
    let profileUrl = user.profilePic;

    coverUrl = cover ? await upload(cover) : coverUrl;
    profileUrl = profile ? await upload(profile) : profileUrl;

    const updatedUser = {
      userId: user.id,
      coverPic: coverUrl,
      profilePic: profileUrl,
      name: texts.name,
      city: texts.city,
      website: texts.website,
    };

    console.log("Updating user data:", updatedUser);

    try {
      const response = await makeRequest.put(`/users/${user.id}`, updatedUser);
      console.log("Update response:", response.data);

      // Update the user in AuthContext
      updateUser(response.data);

      queryClient.invalidateQueries(["user", user.id]);
      setOpenUpdate(false);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <section className="updateProfile-section">
      <h1>Update Profile</h1>
      <form>
        <label htmlFor="file">Cover Photo</label>
        <input type="file" onChange={(e) => setCover(e.target.files[0])} />
        <label htmlFor="file">Profile Photo</label>

        <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
        <input
          type="text"
          name="name"
          value={texts.name}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="text"
          name="city"
          value={texts.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="website"
          value={texts.website}
          onChange={handleChange}
          placeholder="Website"
        />
        <button onClick={handleClick}>Update</button>
      </form>
      <button onClick={() => setOpenUpdate(false)}>Cancel</button>
    </section>
  );
};

Update.propTypes = {
  setOpenUpdate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    city: PropTypes.string,
    website: PropTypes.string,
    coverPic: PropTypes.string,
    profilePic: PropTypes.string,
  }).isRequired,
};

export default Update;

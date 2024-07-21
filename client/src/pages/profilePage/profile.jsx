import { FacebookTwoTone } from "@mui/icons-material";
import { LinkedIn } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import { Pinterest } from "@mui/icons-material";
import { X } from "@mui/icons-material";
import { Place } from "@mui/icons-material";
import { Language } from "@mui/icons-material";
import { EmailOutlined } from "@mui/icons-material";
import { MoreVert } from "@mui/icons-material";

import "./profile.scss";
import Posts from "../../components/posts/posts";

const ProfilePage = () => {
  return (
    <section className="profile-section">
      <div className="images">
        <img
          className="cover"
          src="/src/assets/WhatsApp Image 2023-02-24 at 22.49.29.jpg"
          alt=""
        />
        <img
          className="profile-image"
          src="/src/assets/20210828_234819.jpg"
          alt=""
        />
      </div>
      <div className="profile-container">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoTone fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <LinkedIn fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <Instagram fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <Pinterest fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <X fontSize="medium" />
            </a>
          </div>
          <div className="center">
            <span>Jay Gerrick</span>
            <div className="info">
              <div className="item">
                <Place />
                <span>Kenya</span>
              </div>
              <div className="item">
                <Language />
                <span>sam.com</span>
              </div>
             
            </div>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailOutlined />
            <MoreVert />
          </div>
        </div>
      </div>
      <Posts/>
    </section>
  );
};

export default ProfilePage;

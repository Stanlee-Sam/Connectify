import "./righbar.scss";
import Jay from "../../../src/assets/20210828_234819.jpg"
const RightBar = () => {
  return (
    <section className="rightbar-section">
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          <div className="user">
            <div className="userInfo">
              <img src={Jay} alt="" />
              <span>Jay Gerrick</span>
            </div>
            <div className="buttons">
              <button className="follow">Follow</button>
              <button className="dismiss">Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Jay} alt="" />
              <span>Jay Gerrick</span>
            </div>
            <div className="buttons">
              <button className="follow">Follow</button>
              <button className="dismiss">Dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
            <span>Latest Activities</span>
            <div className="user">
            <div className="userInfo">
              <img src={Jay} alt="" />
              <p>
              <span>Jay Gerrick</span>
              posted a new photo of their home.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Jay} alt="" />
              <p>
              <span>Jay Gerrick</span>
              posted a new photo of their home.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Jay} alt="" />
              <p>
              <span>Jay Gerrick</span>
              posted a new photo of their home.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Jay} alt="" />
              <p>
              <span>Jay Gerrick</span>
              changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Jay} alt="" />
              <p>
              <span>Jay Gerrick </span> posted a new photo of their home.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
            <span>Online Friends</span>
            <div className="user">
            <div className="userInfo">
              <img src={Jay} alt="" />
              <div className="online"/>
              <span>Jay Gerrick </span> 
              
            </div>
            
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Jay} alt="" />
              <div className="online"/>
              <span>Jay Gerrick </span> 
              
            </div>
            
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Jay} alt="" />
              <div className="online"/>
              <span>Jay Gerrick </span> 
              
            </div>
            
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Jay} alt="" />
              <div className="online"/>
              <span>Jay Gerrick </span> 
              
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default RightBar;

import './Post.scss'
import { Link } from 'react-router-dom'
import { FavoriteBorderOutlined, MoreHoriz } from '@mui/icons-material'
import { FavoriteBorder } from '@mui/icons-material'
import { FavoriteOutlined } from '@mui/icons-material'
import { Textsms } from '@mui/icons-material'
import { ShareOutlined } from '@mui/icons-material'
import Comments from '../../components/comments/Comments'
import { useState } from 'react'



const Post = ({post}) => {

    const [commentOpen, setCommentOpen] = useState(false);
    const liked = true

  return (
    
    <section className="post-section">
        <div className="container">
        <div className="user">
            <div className="userInfo">
                <img src={post.profilePic} alt="" />
                <div className="details">
                    <Link to = {`/profile/${post.userId}`} style={{textDecoration :"none", color:"inherit"}}>
                    <span className='name'>{post.name}</span>
                    
                    </Link>
                    <span className='date'> 1 min ago</span>
                    

                </div>

            </div>
            <MoreHoriz />
        </div>
        <div className="content">
            <p>{post.desc}</p>
            <img src={post.img} alt="" />
        </div>
        <div className="info">
            <div className="item">
                { liked ? <FavoriteOutlined/> : <FavoriteBorderOutlined/>}
                500 Likes

            </div>
            <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
                <Textsms/>
                270 Comments

            </div>
            <div className="item">
                <ShareOutlined/>
                Share

            </div>
        </div>
        {commentOpen && <Comments/>}
        </div>

    </section>
  )
}

export default Post

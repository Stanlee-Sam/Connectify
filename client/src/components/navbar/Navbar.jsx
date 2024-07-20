import HomeIcon from '@mui/icons-material/Home';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import GridViewIcon from '@mui/icons-material/GridView';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';


import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {

    const { toggle, darkMode } = useContext(DarkModeContext)
    const { currentUser } = useContext(AuthContext)

  return (
    <section className="navbar-section">
        <div className="left">
            <Link to = "/" style = {{textDecoration: "none"}}>
            <span>Connectify</span>
            </Link>
            {/* <DarkModeOutlined/> */}
            <HomeIcon/>
            {darkMode ?  <WbSunnyIcon onClick = {toggle}/>: <NightlightIcon onClick = {toggle}/>}
            <GridViewIcon/>
            <div className="search">
                <SearchIcon/>
                <input type="text" placeholder="Search..."/>
            </div>
            
            
        </div>
        <div className="right">
       
                <PersonIcon/>
          
            <MailIcon/>
            <NotificationsIcon/>
            <div className="user">
                <img src={currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
            </div>
         
           
        </div>
    </section>

  )
}

export default Navbar

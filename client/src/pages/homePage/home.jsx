// import { Box } from "@mui/material";
// import Navbar from "../navbar/navbar";
// import Register from "../../pages/signup/signup";
// import LoginPage from "../../pages/loginPage/login";
import Share from '../../components/Share/Share';
import Stories from '../../components/stories/stories';
import './home.scss'
import Posts from '../../components/posts/posts';
const HomePage = () => {
    return (
        <section className="homepage-section">
            
            <Stories/>
            <Share/>
            <Posts/>
        </section>
        // <Box>
        //     {/* <Navbar/> */}
        //     <Register/>
        //     <LoginPage/>
        // </Box>
    );
}
 
export default HomePage;
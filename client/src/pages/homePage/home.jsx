// import { Box } from "@mui/material";

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
       
    );
}
 
export default HomePage;
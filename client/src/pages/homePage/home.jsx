import { Box } from "@mui/material";
import Navbar from "../navbar/navbar";
import Register from "../../pages/signup/signup";
const HomePage = () => {
    return (
        // <section className="homepage-section">
        //     <h1>Home page</h1>
        // </section>
        <Box>
            <Navbar/>
            <Register/>
        </Box>
    );
}
 
export default HomePage;
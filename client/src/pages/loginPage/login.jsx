// import { useState } from 'react';
import { AuthContext } from '../../context/authContext.jsx';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {

    const { login } = useContext(AuthContext)

    const handleLogin = () => {
        login()

    }
    return (
        <section className="login-section">
           <div className="card">
           <div className="left">
            <h1>Hello there!</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam velit quidem commodi atque nemo minus alias tempora doloremque voluptate sint mollitia repellat, harum iure amet, suscipit dolore eum. Expedita, quod!
                </p>
                <span>Don't have an account?</span>


                <Link to = "/register">
                <button>Register</button>

                </Link>
                
            
             </div>
             <div className="right">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder='Username' />
                    <input type="text" placeholder='Password' />
                    <button onClick={handleLogin}>Login</button>

                </form>

             </div>

    
           </div>

        </section>
    );
}
 
export default LoginPage;
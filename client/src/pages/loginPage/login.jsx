import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setError(null); 

        try {
            await login(inputs);
            console.log("Login successful, user:", currentUser)
           
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (currentUser) {
          navigate("/");
        }
      }, [currentUser, navigate]);

    return (
        <section className="login-section">
            <div className="card">
                <div className="left">
                    <h1>Hello there!</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam velit quidem commodi atque nemo minus alias tempora doloremque voluptate sint mollitia repellat, harum iure amet, suscipit dolore eum. Expedita, quod!
                    </p>
                    <span>Don't have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                            required
                        />
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;

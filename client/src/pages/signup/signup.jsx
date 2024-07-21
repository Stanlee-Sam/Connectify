import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/signup", inputs);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'An error occurred.');
      } else if (err.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <section className="signup-section">
      <div className="register-card">
        <div className="left">
          <h1>Connectify</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aliquid
            illo numquam corrupti quam officia facilis ullam, vitae officiis
            dignissimos esse fugiat reiciendis optio aperiam rerum amet
            laboriosam, voluptatem iusto.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleClick}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={inputs.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={inputs.lastName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;

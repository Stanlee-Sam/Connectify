import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

const Register = () => {
    const [inputs,setInputs] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      const [error,setError] = useState(null);
    
      const handleChange = (e) => {
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
      }
      console.log(inputs)

      const handleClick = async (e) => {
        e.preventDefault()

        try{
            await axios.post("http://localhost:8000/api/auth/signup", inputs)

        }catch(e){
            setError(error.response.data)

        }


      }
      console.log(error)

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
          <form action="">
            <input type="text" placeholder="FirstName" name = "firstName" onChange={handleChange}/>
            <input type="text" placeholder="LastName" name = "lastName" onChange={handleChange} />
            <input type="text" placeholder="Username" name = "username" onChange={handleChange} />
            <input type="email" placeholder="Email" name = "email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name = "password" onChange={handleChange}/>
            <input type="password" placeholder="Confirm Password" name = "confirmPassword" onChange={handleChange}/>
            {error && error}
            <button type="submit"onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;

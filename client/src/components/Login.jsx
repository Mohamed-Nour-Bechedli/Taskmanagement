import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"


const Login = () => {

    const [data, setData] = useState({
        email : "",
        password : ""
    })

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData( {...data, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // sbumit data to backend
        try {
            const url = "http://localhost:5000/api/auth/login"
            const {data : res} = await axios.post(url, data);
            console.log("Login response:", res);

            localStorage.setItem('token', res.data);
            navigate('/');
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
        

    }

  return (
    <div className="login-container">
      <div className="login-form-container">
        
      </div>
      <div className="form-container">
        <h2>Login to your account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>

            <input 
                type="email" 
                placeholder="Email" 
                name="email" 
                value={data.email} 
                onChange={handleChange} 
                required
                className="input-field" 
            />
            <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                value={data.password} 
                onChange={handleChange} 
                required
                className="input-field" 
            />
            {error && <div className="error-msg">{error}</div>}
            <button className="submit-btn" type="submit">Sign In</button>
        </form>
      </div>
      <div className="login-link">
        <h2>New here?</h2>
        <Link to='/signup'>
            <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  )
}

export default Login
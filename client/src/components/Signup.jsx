import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const Signup = () => {
    const [data, setData] = useState({
        firstName : "",
        lastName : "",
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
            const url = "http://localhost:5000/api/users/register"
            const {data : res} = await axios.post(url, data);
            console.log(res.message);
            // redirect to the login page
            navigate('/login')
        } catch (err) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
        

    }

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>Welcome back</h2>
        <Link to='/login'>
            <button className="login-btn">LogIn</button>
        </Link>
      </div>
      <div className="form-container">
        <h2>Create account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="First Name" 
                name="firstName" 
                value={data.firstName} 
                onChange={handleChange} 
                required
                className="input-field" 
            />
            <input 
                type="text" 
                placeholder="Last Name" 
                name="lastName" 
                value={data.lastName} 
                onChange={handleChange} 
                required
                className="input-field" 
            />
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
            <button className="submit-btn" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup

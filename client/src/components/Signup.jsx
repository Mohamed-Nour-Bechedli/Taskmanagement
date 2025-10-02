import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/api/users/register";
            const { data: res } = await axios.post(url, data);
            console.log(res.message);
            navigate("/login");
        } catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                setError(err.response.data.message);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create account</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-500">
                            Log In
                        </Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="firstName"
                            id="floating_first_name"
                            value={data.firstName}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label
                            htmlFor="floating_first_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            First Name
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="lastName"
                            id="floating_last_name"
                            value={data.lastName}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label
                            htmlFor="floating_last_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Last Name
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="email"
                            id="floating_email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email address
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="password"
                            id="floating_password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label
                            htmlFor="floating_password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                    </div>

                    {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

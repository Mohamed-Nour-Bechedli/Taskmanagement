import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setProfile({
                    firstName: res.data.firstName || "",
                    lastName: res.data.lastName || "",
                    email: res.data.email || "",
                    password: "",
                });
                setLoading(false);
            } catch (err) {
                console.error(err);
                navigate("/login");
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setProfile((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            await axios.put(
                "http://localhost:5000/api/users/profile",
                profile,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage("Profile updated successfully!");
            setProfile((prev) => ({ ...prev, password: "" })); // clear password
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || "Error updating profile");
        }
    };

    const handleBack = () => {
        navigate("/"); // Navigate back to Hero page
    };

    if (loading) return <div className="p-4">Loading profile...</div>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                My Profile
            </h2>

            <button
                onClick={handleBack}
                className="mb-4 px-3 py-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded transition"
            >
                ← Back to Products
            </button>

            {message && (
                <p className="mb-4 text-sm text-green-600 dark:text-green-400">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-200">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-200">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-200">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-200">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={profile.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                        className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;

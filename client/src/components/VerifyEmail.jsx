import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/Axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const VerifyEmail = ({ setToken }) => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState(token ? "Verifying..." : "Please check your email to verify your account.");
    const [success, setSuccess] = useState(false);

    const verifyUser = async () => {
        try {
            const res = await api.get(`/users/verify/${token}`);

            setMessage(res.data.message);
            setSuccess(true);

            toast.success("Your account is verified!", { position: "top-right", autoClose: 3000 });

            
            setTimeout(() => navigate("/login"), 2000);

        } catch (err) {
            setMessage(err.response?.data?.message || "Verification failed");
            setSuccess(false);
        }
    };

    const handleResend = async () => {
        try {
            const email = localStorage.getItem("signupEmail");
            if (!email) return toast.error("Email not found. Please login or signup again.");

            const res = await api.post("/users/resend-verification", { email });
            toast.success(res.data.message, { position: "top-right", autoClose: 3000 });

        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to resend email", { position: "top-right" });
        }
    };

    useEffect(() => {
        if (token) verifyUser();
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <ToastContainer />
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center border-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Email Verification</h2>
                <p className={`${success ? "text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-300"} mb-4`}>
                    {message}
                </p>
                {!success && (
                    <button
                        onClick={handleResend}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Resend Verification Email
                    </button>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;

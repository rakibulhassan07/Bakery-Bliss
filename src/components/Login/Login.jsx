import React, { useContext, useState } from 'react';
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaBreadSlice, FaCookieBite } from "react-icons/fa";
import { MdOutlineBakeryDining } from "react-icons/md";
import { GiCroissant, GiSlicedBread } from "react-icons/gi";
import { AuthContext } from '../../provider/AuthProvider';
import { ToastContainer, toast } from "react-toastify";
import { TbFidgetSpinner } from 'react-icons/tb';

const Login = () => {
    const  {signIn}  = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const showPass = () => setVisible((prev) => !prev);

    const validatePassword = (password) => {
        const hasMinLength = password.length >= 6;

        if (!hasMinLength) {
            const errorMsg = "Password must contain at least 6 characters";
            toast.error(errorMsg);
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        console.log(email, password);
        // Validate password before proceeding
        if (!validatePassword(password)) {
            return;
        }

        setLoading(true);
        signIn(email, password)
            .then((result) => { 
                const user = result.user;
                console.log(user);  
                toast.success("Welcome back to the Bakery Portal!");
                // Wait for toast to be visible before navigation
                setTimeout(() => {
                    const redirectPath = location.state?.from?.pathname || "/";
                    navigate(redirectPath, { replace: true });
                }, 1000); // Short delay to ensure toast is visible

            })
            .catch((error) => {
                console.error(error);
                toast.error("Login failed! Please check your credentials");
            })
            .finally(() => {
                setLoading(false);
            });


       // if (!validatePassword(password)) {
        //    return;
       // }
        
       // try {
         //   setLoading(true);
          //  await signIn(email, password);
         //   toast.success("Welcome back to the Bakery Portal!");
            // Wait for toast to be visible before navigation
        //    setTimeout(() => {
        //        const redirectPath = location.state?.from?.pathname || "/bakery-dashboard";
      //          navigate(redirectPath, { replace: true });
      //      }, 1000); // Short delay to ensure toast is visible
      //  } catch (error) {
     //       toast.error("Login failed! Please check your credentials");
     //   } finally {
    //        setLoading(false);
     //   }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-[linear-gradient(135deg,_#fff3e0_0%,_#ffe0b2_50%,_#ffcc80_100%)]">
            {/* Decorative elements */}
            <motion.div 
                className="absolute top-8 left-8"
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <GiCroissant className="text-amber-700 text-4xl" />
            </motion.div>
            <motion.div 
                className="absolute bottom-8 right-8"
                initial={{ opacity: 0, rotate: 20 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
                <GiSlicedBread className="text-amber-800 text-4xl" />
            </motion.div>
            
            <div className="hero-content flex-col lg:flex-row-reverse gap-8">
                <div className="text-center lg:text-left">
                    <motion.div
                        className="text-center lg:text-left w-full flex flex-col items-center"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }} //make 
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <h1 className="text-4xl font-bold text-amber-800 mb-4">Bakery Portal</h1>
                        <iframe
                            className="w-96 h-96 lg:w-96 lg:h-96 rounded-lg shadow-lg"
                            src="https://lottie.host/embed/7a521f10-ae85-4e17-a6f0-18a938039b62/I74ePgzLZS.json"
                            title="Baker Animation"
                        ></iframe>
                        <div className="mt-4 text-center">
                            <p className="text-amber-900 text-lg">Your one-stop bakery management solution</p>
                            <div className="flex justify-center gap-4 mt-2">
                                <FaBreadSlice className="text-amber-700 text-2xl" />
                                <FaCookieBite className="text-amber-600 text-2xl" />
                                <MdOutlineBakeryDining className="text-amber-800 text-2xl" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="card w-full max-w-md shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                >
                    <div className="card w-full max-w-md shadow-2xl bg-white backdrop-blur-sm bg-opacity-80 border border-amber-200">
                        <div className="px-8 pt-8  flex justify-center">
                            <div className="p-4 rounded-full bg-amber-50 border-2 border-amber-300">
                                <MdOutlineBakeryDining className="text-amber-700 text-5xl" />
                            </div>
                        </div>
                        <form onSubmit={handleLogin} className="card-body px-8 pb-8">
                            <h1 className="text-center font-bold text-2xl text-amber-800 mb-2">Bakery Bliss Login</h1>
                        
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-amber-900 font-medium">Email</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="baker@example.com"
                                        name="email"
                                        className="input input-bordered w-full pl-10 bg-amber-50 focus:bg-white focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                                        required
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-amber-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text text-amber-900 font-medium">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={visible ? "text" : "password"}
                                        placeholder="Password"
                                        className="input input-bordered w-full pl-10 bg-amber-50 focus:bg-white focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                                        required
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-amber-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={showPass}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-600 hover:text-amber-800 focus:outline-none"
                                    >
                                        {visible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                               
                            </div>
                            <div className="form-control mt-6">
                                <button 
                                    type="submit" 
                                    className="btn bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 border-0 shadow-md"
                                >
                                    {loading ? (
                                        <TbFidgetSpinner className="animate-spin h-5 w-5" />
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>
                            </div>
                            
                            <div className="divider text-amber-700 text-xs ">OR</div>
                            <p className="text-center mt-6 text-amber-800">
                                New to our bakery portal?{" "}
                                <Link className="font-semibold link link-hover text-amber-600 hover:text-amber-900" to="/register">
                                    Register as Baker
                                </Link>
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
            <ToastContainer 
                position="top-center" 
                autoClose={2000} 
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Login;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import CSS for toast
import { GiCroissant, GiSlicedBread } from "react-icons/gi";
import { FaEye, FaEyeSlash, FaBreadSlice, FaCookieBite, FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineBakeryDining } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";
import { BsPersonFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";


const Register = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("No file chosen");
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const showPass = () => setVisible((prev) => !prev);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  
  // Image upload with imagebb api
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setImageName(file.name);
    
    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
    
    const formData = new FormData();
    formData.append("image", file);

    // Replace YOUR_IMGBB_API_KEY with your actual ImgBB API key
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.success("Image uploaded successfully!");
      }
    }finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Prepare user data for API
      const saveUser = {
        name: data.name,
        photo: imageUrl, // This will match 'image' in PHP
        email: data.email,
        phone: data.phone,
        password: data.password,
      };
      
      // Send data to your PHP API
      const response = await fetch("http://localhost/BackEnd/api/index.php/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveUser),
      });
      
      const result = await response.json();
      
      if (result.success) {
        reset();
        toast.success("Registration Successful!");
        
        // Navigate after a short delay
        setTimeout(() => {
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath, { replace: true });
        }, 2000);
      } else {
        toast.error(result.error || "Registration failed!");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed! Please try again.");
    } finally {
      setLoading(false);
    }
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
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h1 className="text-4xl font-bold text-amber-800 mb-4">
              Bakery Portal
            </h1>
            <iframe
              className="w-96 h-96 lg:w-96 lg:h-96 rounded-lg shadow-lg"
              src="https://lottie.host/embed/7a521f10-ae85-4e17-a6f0-18a938039b62/I74ePgzLZS.json"
              title="Baker Animation"
            ></iframe>
            <div className="mt-4 text-center">
              <p className="text-amber-900 text-lg">
                Your one-stop bakery management solution
              </p>
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
            <form onSubmit={handleSubmit(onSubmit)} className="card-body px-8 pb-8">
              <h1 className="text-center font-bold text-2xl text-amber-800 mb-2">
                Bakery Bliss Register
              </h1>

              {/* Full Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-amber-900 font-medium">
                    Full Name
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="John Baker"
                    className="input input-bordered w-full pl-10 bg-amber-50 focus:bg-white focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-amber-500">
                      <BsPersonFill className="h-5 w-5" />
                    </span>
                  </div>
                </div>
                {errors.name && <span className="text-red-500 text-sm mt-1">Name is required</span>}
              </div>

              {/* Profile Image Upload Field */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text text-amber-900 font-medium">
                    Profile Image
                  </span>
                </label>
                <div className="flex flex-col space-y-2">
                  {/* Image preview */}
                  {imagePreview && (
                    <div className="w-full flex justify-center mb-2">
                      <img 
                        src={imagePreview} 
                        alt="Profile preview" 
                        className="h-24 w-24 object-cover rounded-full border-2 border-amber-300"
                      />
                    </div>
                  )}
                  
                  {/* File upload UI */}
                  <div className="flex items-center">
                    <label className="flex-1 flex items-center justify-center p-2 bg-amber-50 border border-amber-300 border-dashed rounded-l-md hover:bg-amber-100 cursor-pointer transition-colors">
                      <FaCloudUploadAlt className="mr-2 text-amber-600 text-xl" />
                      <span className="text-amber-700">Choose file</span>
                      <input 
                        type="file" 
                        name="profileImage" 
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <div className="bg-amber-50 border border-amber-300 border-l-0 rounded-r-md p-2 text-amber-700 text-sm overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
                      {imageName}
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text text-amber-900 font-medium">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="baker@example.com"
                    {...register("email", { required: true })}
                    className="input input-bordered w-full pl-10 bg-amber-50 focus:bg-white focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-amber-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </span>
                  </div>
                </div>
                {errors.email && <span className="text-red-500 text-sm mt-1">Email is required</span>}
              </div>

              {/* Phone Number Field */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text text-amber-900 font-medium">
                    Phone Number
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+880 "
                    {...register("phone", { required: true })}
                    className="input input-bordered w-full pl-10 bg-amber-50 focus:bg-white focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-amber-500">
                      <FaPhoneAlt className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                {errors.phone && <span className="text-red-500 text-sm mt-1">Phone number is required</span>}
              </div>

              {/* Password Field */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text text-amber-900 font-medium">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    {...register("password", { required: true })}
                    type={visible ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full pl-10 bg-amber-50 focus:bg-white focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-amber-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
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
                {errors.password && <span className="text-red-500 text-sm mt-1">Password is required</span>}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 border-0 shadow-md"
                  disabled={loading}
                >
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin h-5 w-5" />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
              
              {/* Login Link */}
              <div className="mt-4 text-center">
                <p className="text-amber-800">
                  Already have an account?{" "}
                  <Link to="/login" className="text-amber-600 hover:text-amber-800 font-medium">
                    Login
                  </Link>
                </p>
              </div>
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

export default Register;
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { TbFidgetSpinner } from "react-icons/tb";

import useUsers from "../Hook/useUsers";
import { AuthContext } from "../../provider/AuthProvider";


const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);
  const [users] = useUsers();

  const userExist = users.find((userEmail) => userEmail.email === user.email);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
    
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
        Swal.fire({
          icon: "success",
          title: "Image uploaded successfully!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Image upload failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  // Form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Check for duplicates
      const checkResponse = await fetch("http://localhost/BackEnd/api/index.php/product");
      const existingProducts = await checkResponse.json();
      
      const isDuplicate = existingProducts.some(
        product => product.product_name.toLowerCase() === data.product_name.toLowerCase()
      );
       
      if (isDuplicate) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Product Already Exists",
          text: "A product with this name already exists. Please use product."
        });
        return;
      }

      // Add product
      const productData = {
        product_photo: imageUrl,
        product_name: data.product_name,
        product_price: data.product_price,
        product_details: data.product_details,
        product_quantity: data.product_quantity,
        user_id: parseInt(userExist.id),
      };

      const response = await fetch("http://localhost/BackEnd/api/index.php/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      
      await response.json();
      Swal.fire({
        icon: "success",
        title: "Product Added Successfully"
      });
      reset();
      setImageUrl("");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error adding product"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_right,_#fff3e0_0%,_#ffe0b2_50%,_#ffcc80_100%)] py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Add New Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium block mb-1">Product Image</label>
            <div className="flex flex-col items-center space-y-4">
              {imageUrl && (
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt="Product"
                    className="w-40 h-40 object-cover rounded-lg shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept="image/*"
              />
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-1">
            <label className="text-gray-700 font-medium block">Product Name</label>
            <input
              {...register("product_name", {
                required: "Product name is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.product_name && (
              <p className="text-red-500 text-sm mt-1">{errors.product_name.message}</p>
            )}
          </div>

          {/* Price and Quantity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div className="space-y-1">
              <label className="text-gray-700 font-medium block">Price</label>
              <input
                type="number"
                step="0.01"
                {...register("product_price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              {errors.product_price && (
                <p className="text-red-500 text-sm mt-1">{errors.product_price.message}</p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-1">
              <label className="text-gray-700 font-medium block">Quantity</label>
              <input
                type="number"
                {...register("product_quantity", {
                  required: "Quantity is required",
                  min: { value: 0, message: "Quantity must be positive" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              {errors.product_quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.product_quantity.message}</p>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-1">
            <label className="text-gray-700 font-medium block">Product Details</label>
            <textarea
              {...register("product_details", {
                required: "Product details are required",
              })}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            {errors.product_details && (
              <p className="text-red-500 text-sm mt-1">{errors.product_details.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
           className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <TbFidgetSpinner className="animate-spin h-5 w-5 mr-2" />
                <span>Processing...</span>
              </div>
            ) : (
             <span className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"> Add Product</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
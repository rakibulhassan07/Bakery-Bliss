import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useProducts from "../Hook/useProducts";
import useUsers from "../Hook/useUsers";


const PurchaseModal = ({ isOpen, setIsOpen, product }) => {
  
  const { product_name, product_price, product_quantity } = product || {};
  const { user } = useContext(AuthContext);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product_price);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [users] = useUsers();
  const { id } = useParams();
  const [products] = useProducts();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  // Find customer and product data with null checks
  const customerData = users?.find((userEmail) => userEmail?.email === user?.email);
  const productData = products?.find((product) => product?.id === id);

  useEffect(() => {
    if (!isOpen) {
      reset();
      setTotalQuantity(1);
      setTotalPrice(product_price *0.9);
      setError("");
    }
  }, [isOpen, product_price, reset]);

  const handleQuantity = (e) => {
    const value = parseInt(e.target.value) || 1;
    if (value > product_quantity) {
      setError("Quantity exceeds available stock!");
      setTotalQuantity(product_quantity);
    } else if (value < 1) {
      setTotalQuantity(1);
    } else {
      setError("");
      setTotalQuantity(value);
    }
    setTotalPrice(value * product_price*0.9 );
  };

  const handlePurchase = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      // Check if the user is a seller
      if (customerData?.role === 'seller') {
        setError("Sellers cannot place orders. Please use a customer account.");
        return;
      }

      // Check if user exists and is a customer
      if (!customerData || customerData?.role !== 'customer') {
        setError("Only customers can place orders.");
        return;
      }

      // Validate product exists
      if (!productData) {
        setError("Product not found.");
        return;
      }
      
    
      // Create the order
      const orderData = {
        user_id: parseInt(customerData.id),
        product_id: parseInt(productData.id),
        address: formData.address,
        quantity: parseInt(formData.quantity),
        price: totalPrice.toString(),
        status: "pending",
        product_photo: productData.product_photo,
        product_name: productData.product_name,
      };

      // Send order to database
      const response = await fetch('http://localhost/BackEnd/api/index.php/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      // Update product quantity in database


      alert("Order placed successfully!");
      setIsOpen(false);
      reset();

    } catch (error) {
      alert("Order fail successfully!");
      setIsOpen(false);
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) return null;

  // Add role check in the render
  if (customerData?.role === 'seller') {
    return (
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-6">
            <DialogTitle className="text-xl font-bold mb-4">
              Order Not Allowed
            </DialogTitle>
            <p className="text-red-500 mb-4">
              Sellers cannot place orders. Please use a customer account.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Close
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    );
  }

  if (!product) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() => !isLoading && setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-6">
          <DialogTitle className="text-xl font-bold mb-4">
            Confirm Purchase
          </DialogTitle>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(handlePurchase)} className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Product:</span>
                <span>{product_name}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Price per unit:</span>
                <span>${product_price}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Quantity:</span>
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Minimum quantity is 1" },
                    max: { value: product_quantity, message: "Exceeds available stock" }
                  })}
                  value={totalQuantity}
                  onChange={handleQuantity}
                  className="border p-2 w-24 rounded"
                  disabled={isLoading}
                />
              </div>
              {errors.quantity && (
                <span className="text-red-500 text-sm">{errors.quantity.message}</span>
              )}

              <div className="flex justify-between items-center">
                <span>Shipping Address:</span>
                <input
                  type="text"
                  {...register("address", { 
                    required: "Shipping address is required" 
                  })}
                  className="border p-2 w-64 rounded"
                  placeholder="Enter delivery address"
                  disabled={isLoading}
                />
              </div>
              {errors.address && (
                <span className="text-red-500 text-sm">{errors.address.message}</span>
              )}

              <div className="flex justify-between font-bold">
                <span>Total Price:</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => !isLoading && setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : `ADD Quantity and Address`}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
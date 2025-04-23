import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './components/Home/Home.jsx';
import Root from './components/layouts/Root.jsx';
import Login from './components/Login/Login.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import Register from './Register/Register.jsx';
import BakeryBlissRealtimeChat from './components/BakeryBlissRealtimeChat/BakeryBlissRealtimeChat.jsx';
import BecomeABaker from './components/BecomeABaker/BecomeABaker.jsx';
import CustomerOrder from './components/CustomerOrder/CustomerOrder.jsx';
import Products from './components/Products/Products.jsx';
import Cart from './components/Cart/Cart.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyBakery from './components/MyBakery/MyBakery.jsx';
import PrivateRoute from './components/privateRoute/PrivateRoute.jsx';
import BakerRoute from './components/privateRoute/BakerRoute.jsx';
import MyProfile from './components/MyProfile/MyProfile.jsx';
import DashboardLayout from './components/Layout/DashboardLayout.jsx';
import AdminRoute from './components/privateRoute/AdminRoute.jsx';
import ManageUsers from './components/Deshboard/Admin/ManageUsers.jsx';
import AddProduct from './components/MyBakery/AddProduct.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/register",
        element:<Register></Register>
      },
      {
        path: "/inbox",
        element: <PrivateRoute><BakeryBlissRealtimeChat></BakeryBlissRealtimeChat></PrivateRoute> 
      },
      {
         path:"/addproduct",
         element:<PrivateRoute> <AddProduct></AddProduct> </PrivateRoute>

      },
      
      
      
      {
        path: "/products",
        element: <Products></Products>
      },
      {
        path: "/myprofile",
        element: <PrivateRoute> <MyProfile></MyProfile> </PrivateRoute>       
      },
      {
        path:"/cart",
        element:<PrivateRoute><Cart></Cart></PrivateRoute> 
      },
      {
        path: "/myBakery",
        element: <PrivateRoute><MyBakery></MyBakery></PrivateRoute> 
      },
      {
        path: "/dashboard",
        element:<PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
       children: [
         {
          path: "manage-users",
          element: <PrivateRoute>  <AdminRoute><ManageUsers></ManageUsers></AdminRoute>  </PrivateRoute>
         },
       
         {
          path: "customerOrders",
          element: <PrivateRoute> <BakerRoute><CustomerOrder></CustomerOrder></BakerRoute> </PrivateRoute>
        },
        {
          path: "becomeABaker",
          element: <PrivateRoute> <BecomeABaker></BecomeABaker></PrivateRoute>
        },

        ],
       },
      
    ]
  },
]);
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} /> 
  </QueryClientProvider>
  </AuthProvider>
</StrictMode>
)

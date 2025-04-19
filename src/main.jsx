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
import Deshboard from './components/Deshboard/Deshboard.jsx';
import Cart from './components/Cart/Cart.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyBakery from './components/MyBakery/MyBakery.jsx';

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
        element:<BakeryBlissRealtimeChat></BakeryBlissRealtimeChat>
      },
      {
        path: "/becomeABaker",
        element: <BecomeABaker></BecomeABaker>
      },
      {
        path: "/customerOrder",
        element: <CustomerOrder></CustomerOrder>
      },
      {
        path: "/products",
        element: <Products></Products>
      },
      {
        path: "/dashboard",
        element: <Deshboard></Deshboard>        
      },
      {
        path:"/cart",
        element:<Cart></Cart>
      },
      {
        path: "/myBakery",
        element: <MyBakery></MyBakery>
      }
      
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

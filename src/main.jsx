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
      }
      
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
   
  </StrictMode>,
)

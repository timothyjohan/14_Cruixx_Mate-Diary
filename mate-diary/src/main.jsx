import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Template from './pages/Template.jsx';
import Home from './pages/Home.jsx';
import AddUser from './pages/AddUser.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ShowHistory from './pages/ShowHistory.jsx';
import 'react-toastify/dist/ReactToastify.css';
import HomeLogged from './pages/HomeLogged.jsx';

const router = createBrowserRouter([
  {
    path: "",
    element: <Template />,
    children:[
      {
        path: "",
        element: <Home />
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/Home",
        element: <HomeLogged />,
      },
      { 
        path: "/karyawan/add",
        element: <AddUser/>
      },
      { 
        path: "/history",
        element: <ShowHistory/>
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    <ToastContainer />
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)

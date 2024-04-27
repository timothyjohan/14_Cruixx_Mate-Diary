import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Template from './pages/Template.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import FamilyTree from './pages/FamilyTree.jsx';
import AddAnimal from './pages/AddAnimal.jsx';
import 'react-toastify/dist/ReactToastify.css';

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
        path: "/FamilyTree",
        element: <FamilyTree />,
      },
      {
        path: "/AddAnimal",
        element: <AddAnimal />,
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

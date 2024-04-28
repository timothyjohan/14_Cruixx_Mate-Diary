import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Template from './pages/Template.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ShowHistory from './pages/ShowHistory.jsx';
import FamilyTree from './pages/FamilyTree.jsx';
import History from './pages/History.jsx';
import ShowDetailHistory from './pages/ShowDetailHistory.jsx';
import 'react-toastify/dist/ReactToastify.css';
import HomeLogged from './pages/HomeLogged.jsx';
import MyAnimals from './pages/MyAnimals.jsx';
import AddAnimal from './pages/AddAnimal.jsx';
import Subscription from './pages/Subscription.jsx';
import AddSession from './pages/AddSession.jsx';

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
      },
      {
        path: "/Home",
        element: <HomeLogged />
      },
      {
        path: "/myanimals",
        element: <MyAnimals />,
      },
      {
        path: "/myanimals/add",
        element: <AddAnimal />,
      },
      { 
        path: "/history",
        element: <ShowHistory/>
      },
      { 
        path: "/tree",
        element: <FamilyTree/>
      },
      {
        path: "/mate/history/:id_h_kawin",
        element: <ShowDetailHistory/>
      },
      {
        path: "/history/add",
        element: <AddSession/>
      },
      { 
        path: "/subscription",
        element: <Subscription />
      },
    ]
  }
])
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

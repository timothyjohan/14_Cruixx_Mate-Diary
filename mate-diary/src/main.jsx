import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AddUser from './pages/AddUser.jsx';

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    children: [
      { 
          path: "/karyawan/add",
        element: <AddUser/>
      },
      {
        
      }

    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)

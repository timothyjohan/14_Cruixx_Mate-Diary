import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Template from './pages/Template.jsx';
import Home from './pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: "",
    element: <Template />,
    children:[
      {
        path: "",
        element: <Home />
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)

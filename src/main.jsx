import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root.jsx';
import Home from './components/Home/Home.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Details from './components/Details/Details.jsx';
import Statistics from './components/Statistics/Statistics.jsx';
import Contact from './components/Contact/Contact.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <div>url sothik kore lekh mama 404</div>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>
      },
      {
        path: "statistics",
        element: <Statistics></Statistics>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "/details/:id",
        element: <Details></Details>,
        loader: async () => {
          const response = await fetch("gadgetsData.json");
          if(!response.ok) {
            throw new Error("Failed to fetch gadgets data");
          }
          return response.json();
        }
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

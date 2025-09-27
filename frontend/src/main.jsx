import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import UserForm from './components/UserForm.jsx'
import ContactForm from './components/ContactForm.jsx'
import ErrorPage from './pages/NotFound.jsx'
import { ToastContainer,Bounce } from 'react-toastify'
import { getContacts } from './loaders/contactLoader.js'
import HomePage from './pages/HomePage.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [{
      index:true,
      element:<HomePage/>,
      loader: getContacts,
      errorElement:<ErrorPage/>
    }]
  },
  {
    path: '/userform',
    element: <UserForm/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/contactform',
    element: <ContactForm/>,
    errorElement: <ErrorPage/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Bounce}
                />
  </StrictMode>,
)

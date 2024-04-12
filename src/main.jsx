import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login'
import Config from './pages/Config/Config'
import Collection from './pages/Collection/Collection'
import Layout from './Layouts/Layout'
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'
import { AuthProvider } from './auth/AuthProvider'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/config',
            element: <Config />,
          },
          {
            path: '/recaudo',
            element: <Collection />,
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)

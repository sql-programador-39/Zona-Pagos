import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login'
import Config from './pages/Config/Config'
import Collection from './pages/Collection/Collection'
import Layout from './Layouts/Layout'
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'
import { AuthProvider } from './auth/AuthProvider'
import { ConfigProvider } from './context/ConfigProvider'
import './index.css'
import Monitoring from './pages/Monitoring/Monitoring'
import Pruebas from './components/Pruebas'

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
            path: '/seguimiento',
            element: <Monitoring />,
          },
          {
            path: '/recaudo',
            element: <Collection />,
          },
          {
            path: '/pruebas',
            element: <Pruebas />,
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </AuthProvider>
  </React.StrictMode>,
)

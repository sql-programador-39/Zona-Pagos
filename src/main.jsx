import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import { ConfigProvider } from './context/ConfigProvider'

import Login from './pages/Login/Login'
import Config from './pages/Config/Config'
import Collection from './pages/Collection/Collection'
import Layout from './Layouts/Layout'
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'
import Monitoring from './pages/Monitoring/Monitoring'
import Pruebas from './components/Pruebas'

import './index.css'

const routes = ([
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

export const router = createBrowserRouter( routes/* , {
  basename: '/Web'
}  */);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </AuthProvider>
  </React.StrictMode>,
)

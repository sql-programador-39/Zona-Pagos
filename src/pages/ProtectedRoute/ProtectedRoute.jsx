import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const ProtectedRoute = () => {

  const { isAuthenticaded } = useAuth()

  return (
    <>
      { isAuthenticaded ? <Outlet /> : <Navigate to="/" /> }
    </>
  )
}

export default ProtectedRoute
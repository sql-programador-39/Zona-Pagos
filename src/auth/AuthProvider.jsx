import { createContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [isAuthenticaded, setIsAuthenticaded] = useState(true)
    
    return (
      <AuthContext.Provider 
        value={{
          isAuthenticaded,
          setIsAuthenticaded
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }

export {
  AuthProvider
}

export default AuthContext

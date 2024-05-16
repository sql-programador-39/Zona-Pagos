import { createContext, useState } from 'react'


const ConfigContext = createContext()

const ConfigProvider = ({children}) => {

  const [infoConfig, setInfoConfig] = useState({})

  return (
    <ConfigContext.Provider value={{
      setInfoConfig,
    }}>
      {children}
    </ConfigContext.Provider>
  )
}

export { 
  ConfigProvider 
}

export default ConfigContext
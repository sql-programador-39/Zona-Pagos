import { useContext } from "react"

import ConfigProvider from "../context/ConfigProvider"

const useConfig = () => {
  return useContext(ConfigProvider)
}

export default useConfig
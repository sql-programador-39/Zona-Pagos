import { createContext, useState } from 'react'
import axios from 'axios'

const ConfigContext = createContext()

const ConfigProvider = ({children}) => {

  const [clientId, setClientId] = useState('')
  const [clientName, setClientName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [commerceId, setCommerceId] = useState('')
  const [bankId, setBankId] = useState('')
  const [password, setPassword] = useState('')
  const [searchReferences, setSearchReferences] = useState({})
  const [paymentReferences, setPaymentReferences] = useState({})
  const [paymentPlaceId, setPaymentPlaceId] = useState("")
  const [provider, setProvider] = useState(0)

  const getConfig = async () => {

    const url = 'http://localhost:9090/api/ZOpaOperations/ConfiguracionGeneral'

    try {
      const response = await axios.post(url)
      const data = await response.data.object

      setClientId(data.jsonGeneralConfiguration.clientId)
      setClientName(data.jsonGeneralConfiguration.clientName)
      setCompanyId(data.companyId)
      setCommerceId(data.paymentPlacesConfigurations[0].commerceId)
      setBankId(data.paymentPlacesConfigurations[0].bankId)
      setPassword(data.paymentPlacesConfigurations[0].password)
      setSearchReferences(data.paymentPlacesConfigurations[0].searchReferencesService)
      setPaymentReferences(data.paymentPlacesConfigurations[0].paymentReferenceService)
      setPaymentPlaceId(data.paymentPlacesConfigurations[0].paymentPlaceId)
      setProvider(data.paymentPlacesConfigurations[0].provider)

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    

    const updatedObject = {
      "commerceId": commerceId,
      "bankId": bankId,
      "password": password,
      "searchReferencesService": searchReferences,
      "paymentReferenceService": paymentReferences
    }

    const escaped = escapeJsonString(updatedObject)
    sendInfo(escaped)
  }

  const sendInfo = async (escaped) => {
    const url = 'http://localhost:9090/api/ZOpaOperations/ActualizarConfiguracionGeneral'

    try {
      const response = await axios.post(url, { 
        "jsonGeneralConfiguration": {
          "clientId": clientId,
          "clientName": clientName
        },
        "paymentPlacesConfiguration": [
          {
            "paymentPlaceId": paymentPlaceId,
            "provider": Number(provider),
            "unserializedConfiguration": escaped
          }
        ] 
      }
    )
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const escapeJsonString = (jsonObject) => {
    const jsonString = JSON.stringify(jsonObject, null, 2);
    return jsonString
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026')
      .replace(/'/g, '\\u0027');
  };

  return (
    <ConfigContext.Provider value={{
      getConfig,
      handleSubmit,
      clientId,
      clientName,
      companyId,
      commerceId,
      bankId,
      password,
      searchReferences,
      paymentReferences,
      paymentPlaceId,
      provider,
      setClientId,
      setClientName,
      setCompanyId,
      setCommerceId,
      setBankId,
      setPassword,
      setSearchReferences,
      setPaymentReferences,
      setPaymentPlaceId,
      setProvider
    }}>
      {children}
    </ConfigContext.Provider>
  )
}

export { 
  ConfigProvider 
}

export default ConfigContext
import { useState, useEffect } from 'react'
import useConfig from '../../hooks/useConfig'
import { Switch } from 'antd'
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm'

import { style } from './styleConfig'

const Config = () => {

  const {
    getConfig,
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
  } = useConfig()

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    getConfig()
  }, [])

  const onChange = (checked) => {
    setChecked(checked)
  };

  return (
    <>
      <section>

        <div className=''>
          <h1 className={ style.h1 }>Configuración</h1>
          
          <div className='flex items-center gap-3 mt-5'>
            <p className="font-bold text-2xl">Habilitar Edición</p>
            <Switch value={ checked } onChange={ onChange } />
          </div>
        </div>

        <form action="">
          <div className="my-3 md:my-5">


            <section className='grid grid-cols-3 gap-4'>
              <div className=''>
                <label htmlFor='companyId' className='font-medium text-lg'>ID de la compañia (CompanyId):</label>
                <input 
                  type="text"
                  value={ companyId }
                  id='companyId'
                  name='companyId' 
                  className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                  onChange={ (e) => setCompanyId(e.target.value) }
                  disabled={ !checked }
                />
              </div>

              <div>
                <label htmlFor='clientId' className='font-medium text-lg'>ID del cliente (ClientId):</label>
                <input 
                  type="text"
                  value={clientId}
                  id='clientId'
                  name='clientId'
                  className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                  onChange={ (e) => setClientId(e.target.value) }
                  disabled={ !checked }
                />
              </div>

              <div>
                <label htmlFor='clientName' className='font-medium text-lg'>Nombre del cliente (ClientName):</label>
                <input
                  type="text"
                  value={ clientName }
                  id='clientName'
                  name='clientName'
                  className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                  onChange={ (e) => setClientName(e.target.value) }
                  disabled={ !checked }
                />
              </div>
            </section>


            <div className="my-3 md:my-8">
              <h3 className='font-bold text-2xl mb-5'>Configuraciones de lugares de pago (paymentPlacesConfigurations)</h3>

              <section className='grid grid-cols-2 gap-6 mb-8'>

                <div>
                  <div className='mb-3'>
                    <label htmlFor='provider' className='font-medium text-lg my-3'>Proveedor (Provider):</label>
                    <select 
                      name="provider" 
                      id="provider" 
                      value={ provider || "0" } 
                      className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                      onChange={ (e) => setProvider(e.target.value) }
                      disabled={ true }
                    >
                      <option value="0">Zona Pagos</option>
                      <option value="1">Efecty</option>
                    </select>
                  </div> 

                  <div className='my-3'>
                    <label htmlFor='commerceId' className='font-medium text-lg'>ID del comercio (CommerceId):</label>
                    <input
                      type="text"
                      value={ commerceId }
                      id='commerceId'
                      name='commerceId'
                      className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                      onChange={ (e) => setCommerceId(e.target.value) }
                      disabled={ !checked }
                    />
                  </div>

                  <div className='my-3'>
                    <label htmlFor='bankId' className='font-medium text-lg my-3'>ID del banco (BankId):</label>
                    <input
                      type="text"
                      value={ bankId }
                      id='bankId'
                      name='bankId'
                      className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                      onChange={ (e) => setBankId(e.target.value) }
                      disabled={ !checked }
                    />
                  </div>
                </div>
                
                <div>
                  <div className='mb-3'>
                    <label htmlFor='password' className='font-medium text-lg my-3'>Contraseña (Password):</label>
                    <input 
                      type="text"
                      value={ password }
                      id='password'
                      name='password'
                      className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                      onChange={ (e) => setPassword(e.target.value) }
                      disabled={ !checked }
                    />
                  </div>

                  <div className='my-3'>
                    <label htmlFor='paymentPlaceId' className='font-medium text-lg'>ID del lugar de pago (PaymentPlaceId):</label>
                    <input
                      type="text"
                      value={ paymentPlaceId }
                      id='paymentPlaceId'
                      name='paymentPlaceId'
                      className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                      onChange={ (e) => setPaymentPlaceId(e.target.value) }
                      disabled={ !checked }
                    />
                  </div>
                </div>
              </section>



              <section className='grid grid-cols-2 gap-8 my-8'>

                <div>
                  <h3 className='font-bold text-2xl mb-5'>Servicio de búsqueda de referencias (searchReferencesService)</h3>
                  <div>
                    <div className='my-3'>
                      <label htmlFor='serviceUrlS' className='font-medium text-lg'>Url del servicio (ServiceUrl):</label>
                      <input
                        type="text"
                        value={ searchReferences.serviceUrl || '' }
                        id='serviceUrlS'
                        name='serviceUrlS'
                        className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                        onChange={ (e) => setSearchReferences({...searchReferences, serviceUrl: e.target.value}) }
                        disabled={ !checked }
                      />
                    </div>

                    <div className='my-3'>
                      <label htmlFor='supportLazyLoadingS' className='font-medium text-lg'>Soporte lazy loading (supportLazyLoading):</label>
                      <select 
                        name='supportLazyLoadingS'
                        id='supportLazyLoadingS' 
                        className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                        value={ paymentReferences.supportLazyLoading || false }
                        onChange={ (e) => setPaymentReferences({...paymentReferences, supportLazyLoading: e.target.value}) }
                        disabled={ !checked }
                      >
                        <option value={ false }>No</option>
                        <option value={ true }>Si</option>
                      </select>
                    </div>

                    <div className='my-3'>
                      <label htmlFor='userS' className='font-medium text-lg'>Usuario (User):</label>
                      <input 
                        type="text"
                        value={ searchReferences.user || '' }
                        id='userS'
                        name='userS'
                        className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                        onChange={ (e) => setSearchReferences({...searchReferences, user: e.target.value}) }
                        disabled={ !checked }
                      />
                    </div>

                    <div className='my-3'>
                      <label htmlFor='passwordS' className='font-medium text-lg'>Contraseña (Password):</label>
                      <input
                        type="text"
                        value={ searchReferences.password || '' }
                        id='passwordS'
                        name='passwordS'
                        className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                        onChange={ (e) => setSearchReferences({...searchReferences, password: e.target.value}) }
                        disabled={ !checked }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='font-bold text-2xl mb-5'>Servicio de referencia de pago (paymentReferenceService)</h3>
                  <div>
                    <div className='my-3'>
                      <label htmlFor='serviceUrlP' className='font-medium text-lg'>Url del servicio (ServiceUrl):</label>
                      <input 
                        type="text" 
                        value={ paymentReferences.serviceUrl || '' } 
                        id='serviceUrlP' 
                        name='serviceUrlP'
                        className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` } 
                        onChange={ (e) => setPaymentReferences({...paymentReferences, serviceUrl: e.target.value}) }
                        disabled={ !checked }
                      />
                    </div>

                    <div className='my-3'>
                      <label htmlFor='supportLazyLoadingP' className='font-medium text-lg'>Soporte lazy loading (supportLazyLoading):</label>
                      <select 
                        name='supportLazyLoadingP' 
                        id='supportLazyLoadingP' 
                        className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                        value={ paymentReferences.supportLazyLoading || false }
                        onChange={ (e) => setPaymentReferences({...paymentReferences, supportLazyLoading: e.target.value}) }
                        disabled={ !checked }
                      >
                        <option value={ false }>No</option>
                        <option value={ true }>Si</option>
                      </select>
                    </div>

                    <div className='my-3'>
                      <label htmlFor='userP' className='font-medium text-lg'>Usuario (User):</label>
                      <input 
                        type="text" 
                        value={ paymentReferences.user || '' } 
                        id='userP' 
                        name='userP' 
                        className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                        onChange={ (e) => setPaymentReferences({...paymentReferences, user: e.target.value}) }
                        disabled={ !checked }
                      />
                    </div>

                    <div className='my-3'>
                      <label htmlFor='passwordP' className='font-medium text-lg'>Contraseña (Password):</label>
                      <input 
                        type="text" 
                        value={ paymentReferences.password || '' } 
                        id='passwordP' 
                        name='passwordP' 
                        className={`${ checked ? "bg-zinc-50" : "bg-zinc-200 cursor-not-allowed"}  border border-zinc-300 rounded-lg focus:outline-blue-800 block w-full p-2.5 mt-2` }
                        onChange={ (e) => setPaymentReferences({...paymentReferences, password: e.target.value}) }
                        disabled={ !checked }
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className='w-1/4 mx-auto'>
            <ModalConfirm checked={ checked } />
          </div>
        </form>
      </section>
    </>
  )
}

export default Config

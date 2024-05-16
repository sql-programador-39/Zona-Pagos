import { useState } from 'react'
import useConfig from '../../hooks/useConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'


import Alert from '../../components/Alert/Alert'
import { style } from './styleConfig'

const Config = () => {

  const [idCommerce, setIdCommerce] = useState('')
  const [client, setClient] = useState('')
  const [service, setService] = useState('')
  

  const [configAlert, setConfigAlert] = useState(false)


  const { setInfoConfig } = useConfig()

  const handleSubmitConfig = (e) => {
    e.preventDefault()

    if([idCommerce, client, service].includes('')) {
        setConfigAlert(true)
      setTimeout(() => {
        setConfigAlert(false)
      }, 4000)
      return
    }

    setInfoConfig({ idCommerce, client, service })
  }

  return (
    <>
      <section>
        <h1 className={ style.h1 }>Configuración</h1>

        <div className="my-8 md:my-10">
          <form action="" className='grid lg:grid-cols-2 gap-5 grid-cols-1'>
            <div className={ `${ style.divInputConfig }` }>
              <label htmlFor="id-commerce" className={ style.label }>IdComercio:</label>
              <input 
                type="text" 
                className={` ${style.input} mt-3 sm:m-0`} 
                name='id-commerce' 
                id='id-commerce'
                placeholder='Id del comercio'
                value={ idCommerce }
                onChange={ e => {
                  setIdCommerce(e.target.value)
                }}
              />
            </div>

            <div className={ `${ style.divInputConfig }` }>
              <label htmlFor="client" className={ style.label }>Cliente:</label>
              <input 
                type="text" 
                className={` ${style.input} mt-3 sm:m-0 `}
                name='client' 
                id='client'
                placeholder='Nombre del cliente'
                value={ client }
                onChange={ e => {
                  setClient(e.target.value)
                }}
              />
            </div>

            <div className={ `${ style.divInputConfig }` }>
              <label htmlFor="service" className={ style.label }>Servicio:</label>
              <input 
                type="text" 
                className={` ${ style.input } mt-3 sm:m-0 `} 
                name='service' 
                id='service'
                placeholder='Nombre del servicio'
                value={ service }
                onChange={ e => {
                  setService(e.target.value)
                }}
              />
            </div>

            <button 
              type="submit" 
              className={` ${ style.button } mx-auto w-3/4 lg:w-full lg:m-0 gl:w-1/4` }
              onClick={ handleSubmitConfig }
            ><FontAwesomeIcon icon={ faCircleCheck } /> Aplicar cambios</button>

            { configAlert && <Alert msg="Para aplicar la configuración todos los campos deben estar completos" />}
            
          </form>
        </div>
      </section>
    </>
  )
}

export default Config

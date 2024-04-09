import { useState } from 'react'

import ConfigTable from '../../components/ConfigTable/ConfigTable'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import { style } from './styleConfig'
import Alert from '../../components/Alert/Alert'

const Config = () => {

  const [idCommerce, setIdCommerce] = useState('')
  const [client, setClient] = useState('')
  const [service, setService] = useState('')
  const [typeCollection, setTypeCollection] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [configAlert, setConfigAlert] = useState(false)
  const [filterAlert, setFilterAlert] = useState(false)

  const handleSubmitConfig = (e) => {

    e.preventDefault()

    if([idCommerce, client, service].includes('')) {
        setConfigAlert(true)
      setTimeout(() => {
        setConfigAlert(false)
      }, 4000)
      return
    }

    console.log({ idCommerce, client, service })
  }

  const handleSubmitFilter = (e) => {
    e.preventDefault()

    if([typeCollection, dateStart, dateEnd].includes('')) {
      setFilterAlert(true)
      setTimeout(() => {
        setFilterAlert(false)
      }, 4000)
      return
    }
    
    console.log({ typeCollection, dateStart, dateEnd })
  }

  return (
    <>

      <section>
        <h1 className={ style.h1 }>Configuración</h1>

        <div className="my-14">
          <form action="" className='grid lg:grid-cols-2 gap-5 grid-cols-1'>
            <div className='grid sm:grid-cols-custom grid-cols-1 items-center'>
              <label htmlFor="id-commerce" className={ style.label }>IdComercio:</label>
              <input 
                type="number" 
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

            <div className='grid sm:grid-cols-custom grid-cols-1 items-center'>
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

            <div className='grid sm:grid-cols-custom grid-cols-1 items-center'>
              <label htmlFor="service" className={ style.label }>Servicio:</label>
              <input 
                type="text" 
                className={` ${style.input} mt-3 sm:m-0 `} 
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
              className={`${ style.button } w-3/4 lg:w-full mx-auto lg:m-0 gl:w-1/3` }
              onClick={handleSubmitConfig}
            ><FontAwesomeIcon icon={faCircleCheck} /> Aplicar configuración</button>

            { configAlert && <Alert msg="Para aplicar la configuración todos los campos deben estar completos" />}
            
          </form>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5">Seguimiento pagos</h2>

        <div className="mb-10">
          <form action="" className="grid gl:grid-cols-2 gap-5 grid-cols-1">
            <div className="grid lg:grid-cols-custom grid-cols-1 items-center">
              <label htmlFor="select-collection" className="font-bold text-xl">Tipo Recaudo</label>
              <select 
                name="select-collection" 
                id="select-collection" 
                className={` ${style.input} mt-3 lg:m-0 `}
                onChange={ e => {
                  setTypeCollection(e.target.value)
                }}
              >
                <option value="0">Seleccione</option>
                <option value="realizados">Pagos Realizados</option>
                <option value="reversados">Pagos Reversados</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>

            <div className="grid lg:grid-cols-custom grid-cols-1 items-center">
              <label htmlFor="start-date" className="font-bold text-xl">Filtrar por fechas</label>

              <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 mt-3 lg:m-0">
                <input 
                  type="date" 
                  name='start-date'
                  id='start-date'
                  className={ style.input } 
                  onChange={ e => {
                    setDateStart(e.target.value)
                  }}
                />
                <input 
                  type="date" 
                  className={ style.input } 
                  onChange={ e => {
                    setDateEnd(e.target.value)
                  }}
                />
                <button 
                  type="submit" 
                  className={ style.button }
                  onClick={handleSubmitFilter}
                  ><FontAwesomeIcon icon={faCircleCheck} /> Aplicar filtros</button>

              </div>

            </div>
            
            { filterAlert && <Alert msg="Para poder filtrar la informacion todos los campos se deben llenar" /> }
          </form>

        </div>


        <div>
          <ConfigTable />
        </div>
      </section>
    </>
  )
}

export default Config

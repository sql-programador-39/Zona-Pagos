import { useState } from 'react'

import ConfigTable from '../../components/ConfigTable/ConfigTable'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import { style } from './styleConfig'

const Config = () => {

  const [idCommerce, setIdCommerce] = useState('')
  const [client, setClient] = useState('')
  const [service, setService] = useState('')
  const [typeCollection, setTypeCollection] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  const handleSubmitConfig = (e) => {

    e.preventDefault()

    if (idCommerce !== '' && client !== '' && service !== '') {
      console.log('Campos completos')
    } else {
      console.log('Campos incompletos')
    }
  }

  const handleSubmitFilter = (e) => {
    e.preventDefault()

    if (typeCollection !== '' && dateStart !== '' && dateEnd !== '') {
      console.log('Campos completos filtro')
    } else {
      console.log('Campos incompletos filtro')
    }
  }

  return (
    <>

      <section>
        <h1 className={ style.h1 }>Configuración</h1>

        <div className="my-14">
          <form action="" className='grid grid-cols-2 gap-5'>
            <div className='grid grid-cols-custom items-center'>
              <label htmlFor="id-commerce" className={ style.label }>IdComercio:</label>
              <input 
                type="number" 
                className={ style.input } 
                name='id-commerce' 
                id='id-commerce'
                placeholder='Id del comercio'
                value={ idCommerce }
                onChange={ e => {
                  setIdCommerce(e.target.value)
                }}
              />
            </div>

            <div className='grid grid-cols-custom items-center'>
              <label htmlFor="client" className={ style.label }>Cliente:</label>
              <input 
                type="text" 
                className={ style.input } 
                name='client' 
                id='client'
                placeholder='Nombre del cliente'
                value={ client }
                onChange={ e => {
                  setClient(e.target.value)
                }}
              />
            </div>

            <div className='grid grid-cols-custom items-center'>
              <label htmlFor="service" className={ style.label }>Servicio:</label>
              <input 
                type="text" 
                className={ style.input } 
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
              className={ style.button } 
              onClick={handleSubmitConfig}
            ><FontAwesomeIcon icon={faCircleCheck} /> Aplicar configuración</button>
            
          </form>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5">Seguimiento pagos</h2>

        <div className="mb-14">
          <form action="" className="grid grid-cols-2 gap-5">
            <div className="grid grid-cols-custom items-center">
              <label htmlFor="select-collection" className="font-bold text-xl">Tipo Recaudo</label>
              <select 
                name="select-collection" 
                id="select-collection" 
                className={ style.input }
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

            <div className="grid grid-cols-custom items-center">
              <label htmlFor="" className="font-bold text-xl">Filtrar por fechas</label>

              <div className="flex gap-5">
                <input 
                  type="date" 
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
              </div>
            </div>

            <div></div>

            <button 
              type="submit" 
              className={`${ style.button } mt-2`}
              onClick={handleSubmitFilter}
              ><FontAwesomeIcon icon={faCircleCheck} /> Aplicar filtros</button>
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

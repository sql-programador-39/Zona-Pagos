import { useState } from 'react'
import ConfigTable from '../../components/ConfigTable/ConfigTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { setFollowedPaysFilter } from '../../api/api'

import Alert from '../../components/Alert/Alert'

import { style } from '../Config/styleConfig'

const Monitoring = () => {

  const [filterAlert, setFilterAlert] = useState(false)
  const [infoTable, setInfoTable] = useState([])
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [typeCollection, setTypeCollection] = useState('')

  const handleSubmitFilter = async (e) => {

    e.preventDefault()

    if([typeCollection, dateStart, dateEnd].includes('')) {
      setFilterAlert(true)
      setTimeout(() => {
        setFilterAlert(false)
      }, 4000)
      return
    }

    const data = await setFollowedPaysFilter({ typeCollection, dateStart, dateEnd })
    setInfoTable(data)
  }

  return (
    <>
      <section>
        <h1 className={`mb-8 ${style.h1}`}>Seguimiento pagos</h1>

        <div className="mb-10">
          <form action="" className="grid gl:grid-cols-2 gap-5 grid-cols-1">
            <div className={ `${ style.divInputConfig }` }>
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

            <div className={ `${ style.divInputConfig2 }` }>
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
                className={ `${style.button} col-span-2 lg:col-span-1 w-3/4 mx-auto lg:m-0 lg:w-full hidden lg:inline` }
                onClick={handleSubmitFilter}
                ><FontAwesomeIcon icon={faCircleCheck} /> Aplicar filtros</button>

              </div>

              <div className='mt-3 w-3/4 mx-auto lg:hidden'>
                <button 
                  type="submit" 
                  className={ `${style.button} col-span-2 lg:col-span-1 lg:m-0 w-full` }
                  onClick={handleSubmitFilter}
                >
                  <FontAwesomeIcon icon={faCircleCheck} /> Aplicar filtros
                </button>
              </div>


            </div>
            
            { filterAlert && <Alert msg="Para poder filtrar la informacion todos los campos se deben llenar" /> }
          </form>

        </div>
      </section>

      <div>
        <ConfigTable 
          data={ infoTable }
        />
      </div>
    </>
  )
}

export default Monitoring

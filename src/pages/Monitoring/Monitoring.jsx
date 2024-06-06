import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import { setFollowedPaysFilter } from '../../api/api'

import ConfigTable from '../../components/ConfigTable/ConfigTable'
import LoadModal from '../../components/LoadModal/LoadModal'

import { validateInitialFinal, validateInitialDate, validateFinalDate } from "../../helpers/dateValidations"

import Alert from '../../components/Alert/Alert'

import { style } from '../Config/styleConfig'

const Monitoring = () => {

  const finalDate = new Date()
  const InitalDate = new Date(finalDate);
  InitalDate.setDate(InitalDate.getDate() - 30);

  const InitalDateFormat = InitalDate.toISOString().split('T')[0];

  const [filterAlert, setFilterAlert] = useState(false)
  const [infoTable, setInfoTable] = useState([])
  const [dateStart, setDateStart] = useState(InitalDateFormat)
  const [dateEnd, setDateEnd] = useState(finalDate.toISOString().split('T')[0])
  const [typeCollection, setTypeCollection] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmitFilter = async (e) => {

    e.preventDefault()

    if([typeCollection, dateStart, dateEnd].includes('')) {
      setFilterAlert({
        msg: 'Por favor completa todos los campos.',
      })
      setTimeout(() => {
        setFilterAlert({})
      }, 4000)
      return
    }

    if(!validateInitialFinal(dateStart, dateEnd)) {
      setFilterAlert({
        msg: 'La fecha inicial no puede ser mayor a la fecha final, por favor selecciona una fecha válida.',
      })
      
      setTimeout(() => {
        setFilterAlert({})
      }, 4000)

      return
    }

    if(!validateInitialDate(dateStart, dateEnd)) {
      setFilterAlert({
        msg: 'El rango de fecha no puede ser mayor a 30 días, por favor selecciona un rango válido.',
      })
      
      setTimeout(() => {
        setFilterAlert({})
      }, 4000)

      return
    }

    if(!validateFinalDate(dateEnd)) {
      setFilterAlert({
        msg: 'La fecha final no puede ser mayor a la fecha del día de hoy, por favor selecciona una fecha válida.',
      })

      setTimeout(() => {
        setFilterAlert({})
      }, 4000)

      return
    }

    setIsModalOpen(true)

    const data = await setFollowedPaysFilter({ typeCollection, dateStart, dateEnd })

    console.log(data);

    if(data.message) {
      setFilterAlert({
        msg: "Error al cargar la información, por favor intenta de nuevo.",
      })
      setIsModalOpen(false)

      setTimeout(() => {
        setFilterAlert({})
      }, 4000)

    } else {
      setIsModalOpen(false)
      setInfoTable(data)
    }
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
                <option value="0">-- Seleccione el tipo --</option>
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
                  value={ dateStart }
                />
                <input 
                  type="date" 
                  className={ style.input } 
                  onChange={ e => {
                    setDateEnd(e.target.value)
                  }}
                  value={ dateEnd }
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
            
          </form>

          <div className='w-2/4 mx-auto mt-5'>
            { filterAlert.msg && <Alert msg={filterAlert.msg} /> }
          </div>

        </div>
      </section>

      <div>
        <ConfigTable 
          data={ infoTable }
        />
      </div>

      { isModalOpen && <LoadModal isModalOpen={ isModalOpen } />}
    </>
  )
}

export default Monitoring

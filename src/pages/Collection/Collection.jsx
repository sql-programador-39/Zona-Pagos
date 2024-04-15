import { useState, useEffect } from "react"
import { Checkbox } from "antd"
import { getInfoCollections } from "../../api/api"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faFileCircleCheck,
  faEnvelopeCircleCheck,
  faCircleCheck
} from "@fortawesome/free-solid-svg-icons"

import Alert from "../../components/Alert/Alert"
import CollectionTable from "../../components/CollectionTable/CollectionTable"

import { style } from "../Config/styleConfig"

const Collection = () => {

  const [checkbox, setCheckbox] = useState("Generacion al dia")
  const [date, setDate] = useState("")
  const [buttonGenerate, setButtonGenerate] = useState(true)
  const [buttonComunication, setButtonComunication] = useState(false)
  const [buttonProcess, setButtonProcess] = useState(false)
  const [infoTable, setInfoTable] = useState([])
  const [checkboxDisabled, setCheckboxDisabled] = useState(false)
  const [alert, setAlert] = useState("")
  const today = new Date()

  useEffect(() => {

    const infoGenerate = JSON.parse(sessionStorage.getItem("infoGenerate"))
    
    if(infoGenerate) {
      console.log(infoGenerate);
      setDate(infoGenerate)
      setButtonGenerate(true)
      console.log(date);
      getData()
      return
    }

    setDate(today.toISOString().split('T')[0])

  }, [])

  const getData = async () => {
    const data = await getInfoCollections(date)
    setInfoTable(data)
  }

  const handleButtons = (state) => {
    if(state === "") {
      setButtonGenerate(true)
      setButtonComunication(false)
      setButtonProcess(false)
    } else if(state === "generate") {
      setButtonGenerate(true)
      setButtonComunication(true)
      setButtonProcess(true)
    } else if(state === "comunication") {
      setButtonGenerate(false)
      setButtonComunication(true)
      setButtonProcess(true)
    } else if(state === "process") {
      setButtonGenerate(true)
      setButtonComunication(false)
      setButtonProcess(false)
    }
  }

  const handleChangeCheckbox = (e) => {
    setCheckbox(e.target.value);

    if(e.target.value === "Generacion al dia") {
      setDate(today.toISOString().split('T')[0])
    }
  }
  
  const handleClickedGenerate = async () => {
    
    if(date < today.toISOString().split('T')[0]) {
      setAlert("La fecha no puede ser menor a la actual")

      setTimeout(() => {
        setAlert("")
      }, 4000)

      return
    }

    const monthDate = date.split('-')[1]
    const monthCompare = today.toISOString().split('T')[0].split('-')[1]

    if(monthDate !== monthCompare) {
      setAlert("La fecha no puede ser de un mes mayor o menor al mes actual")

      setTimeout(() => {
        setAlert("")
      }, 4000)

      return
    }
    
    sessionStorage.setItem("infoGenerate", JSON.stringify(date))

    const data = await getInfoCollections(date)

    setInfoTable(data)
    handleButtons("generate")
  }

  const handleClickedComunication = () => {
    console.log("Comunicación");

    setInfoTable(infoTable.map((item) => {
      item.disabled = true
      return item
    }))

    handleButtons("comunication")
  }

  const handleClickedProcess = () => {
    console.log(infoTable);

    
    handleButtons("process")
    setInfoTable([])
    sessionStorage.removeItem("infoGenerate")
  }

  return (
    <>

      <section>
        <h1 className={ style.h1 }>Construir referencias</h1>
        
        <form action="" className="my-8 md:my-10">
          <div className="grid lg:grid-cols-custom mb-10 gap-5">
            <div className="flex items-center">
              <label htmlFor="check-day" className={ style.label }>Generación al dia</label>
              <Checkbox  name="check-day" id="check-day" className="ms-3" checked={ checkbox === "Generacion al dia" } value="Generacion al dia" onChange={ handleChangeCheckbox } />
            </div>

            <div className="flex items-center">
              <label htmlFor="check-proyec" className={ style.label }>Generación con proyección</label>
              <Checkbox name="check-proyec" id="check-proyec" className="ms-3" checked={ checkbox === "Generacion con proyeccion" } value="Generacion con proyeccion" onChange={ handleChangeCheckbox } />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-custom my-5 gap-5">
            
            <input 
              value={date} 
              type="date" 
              className={ style.input }
              disabled={ checkbox === "Generacion al dia" }
              onChange={ e => setDate(e.target.value) }
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <button 
                type="button" 
                className={ buttonGenerate ? `${ style.button } xl:w-3/4 w-full` : `${ style.buttonDisabled } xl:w-3/4 w-full` }
                disabled={ !buttonGenerate }
                onClick={ handleClickedGenerate }
              ><FontAwesomeIcon icon={ faFileCircleCheck } /> Generar</button>

              <button 
                type="button"
                className={ buttonComunication ? `${ style.button } xl:w-3/4 w-full` : `${ style.buttonDisabled } xl:w-3/4 w-full` }
                disabled={ !buttonComunication }
                onClick={ handleClickedComunication }
              ><FontAwesomeIcon icon={ faEnvelopeCircleCheck } /> Comunicación</button>

              <button 
                type="button"
                className={ buttonProcess ? `${ style.button } xl:w-3/4 w-full`  : `${ style.buttonDisabled } xl:w-3/4 w-full` } 
                disabled={ !buttonProcess }
                onClick={ handleClickedProcess }
              ><FontAwesomeIcon icon={ faCircleCheck } /> Procesar Recaudo</button>
            </div>
          </div>

        </form>

        <div>
          { alert.length !== 0 && <Alert msg={alert} /> }
        </div>

      </section>

      <section>
        
        <h2 className="text-2xl font-bold mb-5">Correciones</h2>

        <div>
          <CollectionTable 
            data={ infoTable }
            setInfoTable={ setInfoTable }
            comunication={ checkboxDisabled }
          />
        </div>

      </section>
    </>
  )
}

export default Collection

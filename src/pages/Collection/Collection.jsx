import { useState, useEffect } from "react"

import Alert from "../../components/Alert/Alert"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faFileCircleCheck,
  faEnvelopeCircleCheck,
  faCircleCheck,
  faClipboardCheck
} from "@fortawesome/free-solid-svg-icons"
import { style } from "../Config/styleConfig"
import CollectionTable from "../../components/CollectionTable/CollectionTable"

import { getInfoCollections, setFollowedPaysFilter } from "../../api/api"

const Collection = () => {

  const [checkbox, setCheckbox] = useState("Generacion al dia")
  const [date, setDate] = useState("")
  const [buttonGenerate, setButtonGenerate] = useState(true)
  const [buttonComunication, setButtonComunication] = useState(false)
  const [buttonProcess, setButtonProcess] = useState(false)
  const [infoTable, setInfoTable] = useState([])
  const [alert, setAlert] = useState(false)
  const today = new Date()

  useEffect(() => {

    setDate(today.toISOString().split('T')[0])

    if(date < today.toISOString().split('T')[0]) {
      localStorage.removeItem("infoGenerate")
      return
    }
    
    const infoGenerate = JSON.parse(localStorage.getItem("infoGenerate"))

    if(infoGenerate) {
      setDate(infoGenerate)
      setButtonGenerate(true)
      setInfoTable(getInfoCollections(date))
    }

  }, [])

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

  const handleChangeDate = (e) => {
    setDate(e.target.value)
    
    console.log(date);
    console.log(e.target.value);
  }
  
  const handleClickedGenerate = () => {
    
    if(date < today.toISOString().split('T')[0]) {
      setAlert(true)

      setTimeout(() => {
        setAlert(false)
      }, 4000)

      return
    }
    
    
    localStorage.setItem("infoGenerate", JSON.stringify(date))
    setInfoTable(getInfoCollections(date))
    handleButtons("generate")
  }

  const handleClickedComunication = () => {
    console.log("Comunicación");
    handleButtons("comunication")
  }

  const handleClickedProcess = () => {
    console.log(infoTable);

    
    handleButtons("process")
    setInfoTable([])
    localStorage.removeItem("infoGenerate")
  }
  
  const handleClickedUpdate = () => {
    console.log("Actualizar");
  }

  return (
    <>

      <section>
        <h1 className={ style.h1 }>Construir referencias</h1>
        
        <form action="" className="my-8 md:my-10">
          <div className="grid lg:grid-cols-custom mb-10 gap-5">
            <div className="flex items-center">
              <label htmlFor="check-day" className={ style.label }>Generación al dia</label>
              <input type="checkbox" name="check-day" id="check-day" className="checkbox-round ms-3" checked={checkbox === "Generacion al dia"} value="Generacion al dia" onChange={handleChangeCheckbox} />
            </div>

            <div className="flex items-center">
              <label htmlFor="check-proyec" className={ style.label }>Generación con proyección</label>
              <input type="checkbox" name="check-proyec" id="check-proyec" className="checkbox-round  ms-3" checked={checkbox === "Generacion con proyeccion"} value="Generacion con proyeccion" onChange={handleChangeCheckbox} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-custom my-5 gap-5">
            
            <input value={date} type="date" className={ style.input } onChange={handleChangeDate} disabled={checkbox === "Generacion al dia"}/>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <button 
                type="button" 
                className={ buttonGenerate ? `${ style.button } xl:w-3/4 w-full` : `${ style.buttonDisabled } xl:w-3/4 w-full` }
                disabled={!buttonGenerate}
                onClick={handleClickedGenerate}
              ><FontAwesomeIcon icon={faFileCircleCheck} /> Generar</button>

              <button 
                type="button"
                className={buttonComunication ? `${ style.button } xl:w-3/4 w-full` : `${ style.buttonDisabled } xl:w-3/4 w-full` }
                disabled={!buttonComunication}
                onClick={handleClickedComunication}
              ><FontAwesomeIcon icon={faEnvelopeCircleCheck} /> Comunicación</button>

              <button 
                type="button"
                className={ buttonProcess ? `${ style.button } xl:w-3/4 w-full`  : `${ style.buttonDisabled } xl:w-3/4 w-full` } 
                disabled={!buttonProcess}
                onClick={handleClickedProcess}
              ><FontAwesomeIcon icon={faCircleCheck} /> Procesar Recaudo</button>
            </div>
          </div>

        </form>

        <div>
          { alert && <Alert msg="La fecha no puede ser menor a la actual" /> }
        </div>

      </section>

    
      <section>
        
        <h2 className="text-2xl font-bold mb-5">Correciones</h2>

        <div>
          <CollectionTable 
            data={infoTable}
          />
        </div>

        <div className="flex justify-end mt-5">
          <button 
            className={`${ style.button } w-1/2 sm:w-1/4`}
            onClick={handleClickedUpdate}
          ><FontAwesomeIcon icon={faClipboardCheck} /> Actualizar</button>
        </div>

      </section>
    </>
  )
}

export default Collection

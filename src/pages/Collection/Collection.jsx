import { useState, useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faFileCircleCheck,
  faEnvelopeCircleCheck,
  faCircleCheck,
  faClipboardCheck
} from "@fortawesome/free-solid-svg-icons"
import { style } from "../Config/styleConfig"
import CollectionTable from "../../components/CollectionTable/CollectionTable"

const Collection = () => {

  const [checkbox, setCheckbox] = useState("Generacion al dia")
  const [date, setDate] = useState("")
  const [buttonGenerate, setButtonGenerate] = useState(false)
  const [buttonComunication, setButtonComunication] = useState(false)
  const [buttonProcess, setButtonProcess] = useState(false)
  const today = new Date()

  useEffect(() => {
    setDate(today.toISOString().split('T')[0])
  }, [])

  const handleChangeCheckbox = (e) => {
    setCheckbox(e.target.value);


    if(e.target.value === "Generacion al dia") {
      setDate(today.toISOString().split('T')[0])
    }
  }

  const handleChangeDate = (e) => {
    setDate(e.target.value)
  }

  const handleClickedGenerate = () => {
    console.log("Generar");
    setButtonGenerate(true)
  }

  const handleClickedComunication = () => {
    console.log("Comunicación");
    setButtonComunication(true)
  }

  const handleClickedProcess = () => {
    console.log("Procesar Recaudo");
    setButtonProcess(true)
  }

  const handleClickedUpdate = () => {
    console.log("Actualizar");
    setButtonGenerate(false)
    setButtonComunication(false)
    setButtonProcess(false)
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
                className={`${ style.button } xl:w-3/4 w-full`} 
                onClick={handleClickedGenerate}
              ><FontAwesomeIcon icon={faFileCircleCheck} /> Generar</button>

              <button 
                className={ buttonGenerate ? `${ style.button } xl:w-3/4 w-full` : `${ style.buttonDisabled } xl:w-3/4 w-full` }
                disabled={!buttonGenerate} // Deshabilitar si !buttonGenerate (es decir, buttonGenerate es false)
                onClick={handleClickedComunication}
              ><FontAwesomeIcon icon={faEnvelopeCircleCheck} /> Comunicación</button>

              <button 
                className={ buttonGenerate ? `${ style.button } xl:w-3/4 w-full`  : `${ style.buttonDisabled } xl:w-3/4 w-full` } 
                disabled={!buttonGenerate} // Deshabilitar si !buttonGenerate (es decir, buttonGenerate es false)
                onClick={handleClickedProcess}
              ><FontAwesomeIcon icon={faCircleCheck} /> Procesar Recaudo</button>
            </div>
          </div>

        </form>

      </section>

    
      <section>
        
        <h2 className="text-2xl font-bold mb-5">Correciones</h2>

        <div>
          <CollectionTable />
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

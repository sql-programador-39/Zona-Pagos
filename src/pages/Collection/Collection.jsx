import { useState, useEffect } from "react"
import { Checkbox } from "antd"
import { getInfoCollections, sendInfoProcessed } from "../../api/api"
import { convertCurrencyToNumber } from "../../helpers/formatters"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faFileCircleCheck,
  faEnvelopeCircleCheck,
  faCircleCheck
} from "@fortawesome/free-solid-svg-icons"

import Alert from "../../components/Alert/Alert"
import CollectionTable from "../../components/CollectionTable/CollectionTable"

import { style } from "../Config/styleConfig"
import LoadModal from "../../components/LoadModal/LoadModal"

const Collection = () => {

  const [checkbox, setCheckbox] = useState("Generacion al dia")
  const [date, setDate] = useState("")
  const [buttonGenerate, setButtonGenerate] = useState(true)
  const [buttonComunication, setButtonComunication] = useState(false)
  const [buttonProcess, setButtonProcess] = useState(false)
  const [infoTable, setInfoTable] = useState([])
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [alert, setAlert] = useState("")
  const today = new Date()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setDate(today.toISOString().split('T')[0])
  }, [])

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

    setIsModalOpen(true)
    const data = await getInfoCollections(date)
    
    setIsModalOpen(false)
    const dataWithKeys = data.map((item, index) => ({ ...item, key: index.toString() }));

    setInfoTable(dataWithKeys)
    setButtonProcess(true)
  }

  const handleClickedProcess = async () => {
    // Filtrar los elementos que tienen al menos un item2 con checked igual a false
    const filteredItems = infoTable.filter(item => 
      item.originalCompanyReference.some(item2 => item2.checked)
    );

    let objSend = {};
  
    // Iterar sobre los elementos filtrados
    filteredItems.map(item => {
      objSend = {
        "companyReferenceId": item.referencia,
        "clientId": item.cedula,
        "productReferences": []
      };

      item.originalCompanyReference.map(item2 => {
        let obj2 = {}

        if (!item2.checked) {
          if (item.referencia === item2.idReferenciaCompany) {
            const objDelete = {
              "productReferenceId": item2.referenciaProducto,
              "clientId": (item2.cedula).toString(),
              "productCode": item2.codigoProducto,
              "subProductCode": item2.subCodigoProducto,
              "productId": item2.idProducto,
              "dueValue": convertCurrencyToNumber(item2.valor)
            };
  
            obj2 = objDelete;
          }

          objSend.productReferences.push(obj2);
        }
      });

      sendInfoProcessed(objSend);
      setInfoTable([]);
      setExpandedRowKeys([]);
      setButtonProcess(false);
    });
  };  

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
              <Checkbox name="check-proyec" disabled={true} id="check-proyec" className="ms-3" checked={ checkbox === "Generacion con proyeccion" } value="Generacion con proyeccion" onChange={ handleChangeCheckbox } />
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
                /* disabled={ !buttonGenerate } */
                onClick={ handleClickedGenerate }
              ><FontAwesomeIcon icon={ faFileCircleCheck } /> Generar</button>

              <button 
                type="button"
                className={ buttonComunication ? `${ style.button } xl:w-3/4 w-full` : `${ style.buttonDisabled } xl:w-3/4 w-full` }
                disabled={ true }
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
            expandedRowKeys={ expandedRowKeys }
            setExpandedRowKeys={ setExpandedRowKeys }
          />
        </div>
        
        { isModalOpen && <LoadModal isModalOpen={ isModalOpen } /> }

      </section>
    </>
  )
}

export default Collection

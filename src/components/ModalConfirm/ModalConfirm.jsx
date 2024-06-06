import { Modal } from 'antd'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer } from '@fortawesome/free-solid-svg-icons'

import useConfig from '../../hooks/useConfig'

import Spinner from '../Spinner/Spinner'

import AlertModal from '../AlertModal/AlertModal'

const ModalConfirm = ({checked}) => {

  const { handleSubmit, loading, isModalOpen, setIsModalOpen, showAlert } = useConfig()

  const showModal = () => {
    setIsModalOpen(true)
  };

  const handleOk = async (e) => {
    handleSubmit(e)
  };

  const handleCancel = () => {
    setIsModalOpen(false)
  };

  return (
    <>
      <button
        onClick={showModal}
        className={`${checked ? "bg-blue-800 hover:bg-blue-700 text-white" : "bg-zinc-300 cursor-not-allowed text-zinc-700"} w-full font-bold px-6 py-2 rounded  focus:outline-none focus:shadow-outline`}
        disabled={ !checked } 
        type='button'
      >
        Actualizar datos
      </button>
      <Modal 
        title="Actualización de datos" 
        open={isModalOpen}
        closable={false}
        footer={[
          <div key="buttons">
            {
              showAlert || loading ? null : (
                <>
                  <button 
                    key="back" 
                    onClick={handleCancel}
                    className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-6 py-2 me-4 rounded-lg focus:outline-none focus:shadow-outline'
                    >
                    Cerrar
                  </button>

                  <button 
                    key="submit"
                    onClick={handleOk}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-500 font-bold px-6 py-2 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                    Actualizar datos
                  </button>
                </>
              )
            }
          </div>
        ]}
        >
          { showAlert ? (
              <AlertModal />
            ) : (

            loading ? (
              <>
                <div className='mt-5'>
                  <Spinner />
                </div>
                
                <div>
                  <p className='font-medium text-xl text-center mt-5 mb-8'>Actualizando datos...</p>
                </div>
              </>
            ) : (
              <>
                <div className='flex justify-center my-5'>
                  <FontAwesomeIcon icon={ faServer } className='h-24 w-24 text-blue-800' />
                </div>
                
                <div className='font-medium text-xl text-center mb-8'>
                  <p>¿Estas seguro que quieres actualizar los datos?</p>
                </div>
              </>
            )
          ) 
        }

          
      </Modal>
    </>
  );
};
export default ModalConfirm
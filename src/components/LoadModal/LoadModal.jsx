import { Modal } from 'antd'
import Spinner from '../Spinner/Spinner'

const LoadModal = ({ isModalOpen }) => {
  return (
    <>
      <Modal 
        title="Cargando datos..." 
        open={isModalOpen}
        closable={false}
        footer={null}
        >
          
        <div className="modal-content">
          <Spinner />
          <p className='text-center font-bold text-xl mt-2'>Cargando datos...</p>
        </div>
          
      </Modal> 
    </>
  )
}

export default LoadModal

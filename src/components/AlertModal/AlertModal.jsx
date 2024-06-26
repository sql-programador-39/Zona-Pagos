import useConfig from "../../hooks/useConfig"

import './MarkCheck.css'
import './MarkCross.css'

const AlertModal = () => {

  const { type, text } = useConfig()

  return (
    <>
      {
        type === 'success' ? (
          <div> 
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
          </div>
        ) : (
          <div>
            <svg className="crossmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="crossmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="crossmark__check" fill="none" d="M16 16 36 36 M36 16 16 36"/></svg>
          </div>
        )
      }

      <p className='font-medium text-xl text-center mt-5 mb-8'>{text}</p>
    </>
  )
}

export default AlertModal

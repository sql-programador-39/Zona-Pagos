const Alert = ({ msg }) => {

  
  return (
    <>
      <div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error! </strong>
          <span>{ msg }</span>
        </div>
      </div>
    </>
  )
}

export default Alert

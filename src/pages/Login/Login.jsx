import { useNavigate } from 'react-router-dom'

import { Switch } from 'antd'

import { style } from '../Config/styleConfig'

import img7 from '../../assets/photoLogin.jpg'

const Login = () => {

  const navigate = useNavigate()

  const handleChangeSwitch = (checked) => {
    console.log(checked)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submit')
    navigate('/config')
  }

  return (
    <>
      <section className="h-screen grid lg:grid-cols-2">

        <div className="bg-blue-800 text-white h-full lg:flex flex-col justify-center hidden">

          <div className='mx-16'>
            <h1 className='text-6xl font-bold mb-8'>Zona Pagos</h1>
            <p className='text-xl'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea nobis iste odio maiores provident illo corrupti quisquam, repudiandae quia voluptatibus. Expedita excepturi modi doloremque quod voluptatem exercitationem minus, velit distinctio.</p>
          </div>

          <div className='mx-16'>
            <div className="mt-5 w-full h-96">
              <img className='h-full bg-cover w-full rounded-lg' src={ img7 } alt="" />
            </div>
          </div>

        </div>

        <div className="flex flex-col justify-center items-center">
          <h2 className='text-4xl font-bold mb-5'>Iniciar Sesión</h2>
          <form action="" onSubmit={handleSubmit} className='lg:w-4/5 w-full px-5 md:px-20'>
            <div className='grid mb-3'>
              <label className={`${ style.label } mb-2`} htmlFor="user">Usuario:</label>
              <input className={ style.input } type="email" name="user" id="user" placeholder='Ingrese su usuario' />
            </div>

            <div className='grid mb-3'>
              <label className={`${ style.label } mb-2`} htmlFor="password">Contraseña:</label>
              <input className={ style.input } type="password" name="password" id="password" placeholder='Contraseña' />
            </div>

            <div className='mb-8 flex items-center gap-3'>
              <Switch id="switch-login" title="switchLogin" onChange={ handleChangeSwitch } />
              <p style={ {color: "#9f9f9f", fontSize: "1.1rem"} }>Recuerdame</p>
            </div>

            <div className='flex justify-center'>
              <button type="submit" className={ `${ style.button } w-2/4` }>Ingresar</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login


import { Switch } from 'antd';

import { style } from '../Config/styleConfig';

const Login = () => {

  const handleChangeSwitch = (checked) => {
    console.log(checked);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');
  }

  return (
    <>
      <section className="h-screen grid grid-cols-2">

        <div className="bg-blue-300 text-white h-full flex flex-col justify-center">
          <h1>Zona Pagos</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea nobis iste odio maiores provident illo corrupti quisquam, repudiandae quia voluptatibus. Expedita excepturi modi doloremque quod voluptatem exercitationem minus, velit distinctio.</p>

          <div className="flex gap-5">
            <div className="bg-white w-10 h-10"></div>
            <div className="bg-white w-10 h-10"></div>
            <div className="bg-white w-10 h-10"></div>
            <div className="bg-white w-10 h-10"></div>
            <div className="bg-white w-10 h-10"></div>
          </div>

          <div>
            <div className="bg-white w-96 h-96 mt-5"></div>
          </div>
        </div>

        <div className="h-full flex flex-col justify-center items-center">
          <form action="" onSubmit={handleSubmit} className='w-2/4'>
            <h2 className='mb-3'>Login</h2>
            <div className='grid mb-3'>
              <label className={`${style.label} mb-2`} htmlFor="user">Usuario:</label>
              <input className={ style.input } type="email" name="user" id="user" />
            </div>

            <div className='grid mb-3'>
              <label className={`${style.label} mb-2`} htmlFor="password">Contraseña:</label>
              <input className={ style.input } type="password" name="password" id="password" />
            </div>

            <div className='mb-3 flex items-center gap-3'>
              <Switch id="switch-login" title="switchLogin" onChange={handleChangeSwitch} style={{ background: "#6f6f6f" }} />
              <p style={{color: "#6f6f6f", fontSize: "1.1rem"}}>Recuerdame</p>
            </div>

            <button type="submit">Ingresar</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login

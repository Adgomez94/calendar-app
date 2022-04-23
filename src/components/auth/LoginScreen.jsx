import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

const initialRegisterForm = {
    reName: '',
    rePassword1: '',
    rePassword2: '',
    reEmail: ''
}

const initialLoginForm = {
  lEmail: 'hola2@gmail.com',
  lPassword: 'gheuassss'
}

const LoginScreen = () => {

  const [ formLoginValues, handleLoginInputChange ] = useForm(initialLoginForm)
  const [ formRegisterValues, handleRegisterInputChange ] = useForm(initialRegisterForm)

  // redux
  const dispatch = useDispatch()

  const { lEmail, lPassword } = formLoginValues
  const { reName, rePassword1, rePassword2, reEmail } = formRegisterValues

  const handleSubmitLogin = (e) => {
    e.preventDefault()

    dispatch(startLogin(lEmail, lPassword))
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault()
    if(rePassword1 !== rePassword2) return Swal.fire('Error', 'Las contraseña tiene que ser iguales', 'error')
    dispatch(startRegister(reEmail, rePassword1, reName))
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          {/* Ingreso */}
          <h3>Ingreso</h3>
          <form onSubmit={handleSubmitLogin}>
            <div className="form-group">
              <input 
                type="text"
                className="form-control"
                placeholder="Correo"
                name='lEmail'
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name = "lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input 
                  type="submit"
                  className="btnSubmit"
                  value="Login" 
              />
            </div>
          </form>
        </div>
        <div className="col-md-6 login-form-2">
             {/* Registro */}
          <h3>Registro</h3>
          <form onSubmit={handleSubmitRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='reName'
                value={reName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='reEmail'
                value={reEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña" 
                name='rePassword1'
                value={rePassword1}
                onChange={handleRegisterInputChange}
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Repita la contraseña" 
                    name='rePassword2'
                    value={rePassword2}
                    onChange={handleRegisterInputChange}
                />
            </div>
            <div className="form-group">
              <input 
                type="submit" 
                className="btnSubmit" 
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}

export default LoginScreen

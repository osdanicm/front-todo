import '../estilos/login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define la interfaz IInfo que describe la estructura de la información de inicio de sesión
interface IInfo {
  username: string;
  password: string;
}

// Define la interfaz IProps que describe las propiedades que el componente espera recibir
interface IProps {
  onLogin: (nombre: string, id: number) => void;
}

// Define la interfaz SubmitEvent que extiende la interfaz Event para incluir la propiedad submitter
interface SubmitEvent extends Event {
  submitter: HTMLElement | null;
}

// Define el componente LoginPage
function LoginPage ({ onLogin }: IProps) {

  // Utiliza la función useState de React para manejar el estado del formulario de inicio de sesión
  const [info, setInfo] = useState<IInfo>({ username: '', password: '' });

  // Define la función handleChange que se encarga de actualizar el estado del formulario cuando el usuario escribe en los campos de entrada
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value
    }) 
  }

  // Define la función handleSubmit que se encarga de manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Obtiene el elemento que inició el envío del formulario
    const nativeEvent = e.nativeEvent as unknown as SubmitEvent;
    // Verifica si el elemento que inició el envío del formulario es el botón de inicio de sesión
    if((nativeEvent.submitter as HTMLButtonElement).name == 'login'){
      // Si el elemento que inició el envío del formulario es el botón de inicio de sesión, envía una solicitud POST al servidor para iniciar sesión
      axios.post('http://localhost:5000/login', info)
        .then(({ data }) => {
          // Si la solicitud es exitosa, llama a la función onLogin pasándole el nombre y el id del usuario como argumentos
          const { id, nombre } = data[0];
          onLogin(nombre, id);
        })
        .catch(({ response }) => {
          // Si ocurre un error al iniciar sesión, muestra un mensaje de error al usuario
          if(!response){
            alert('Usuario incorrecto');
        }
        })
    }
    // Verifica si el elemento que inició el envío del formulario es el botón de registro
    else if((nativeEvent.submitter as HTMLButtonElement).name == 'register'){
      // Si el elemento que inició el envío del formulario es el botón de registro, envía una solicitud POST al servidor para registrar al usuario
      axios.post('http://localhost:5000/register', info)
      .then(({ data }) => {
        // Si la solicitud es exitosa, muestra un mensaje al usuario indicando que se ha registrado correctamente
        alert( data.messagge );
      })
      .catch(({ response }) => {
        // Si ocurre un error al registrar al usuario, muestra un mensaje de error al usuario
        if(!response){
          alert('Error de registro');
        }
      })
    }
  };
  
  //devuelve el html del login, con los botones de logear y registrar
  return (
    <div className="login-box">
      <div className="card">
        <div className="card-body login-card-body">
          <div className='loginPage'>
            <h3>Iniciar sesión</h3>
          </div>
          {/* Define un elemento form para el formulario de inicio de sesión */}
          <form onSubmit={ handleSubmit }>
            {/* Define un campo de entrada para el nombre de usuario */}
            <div className="input-group mb-3">
              <Form.Control type="text" name="username" placeholder="Username" onChange={ handleChange } />
              <div className="input-group-append">
              </div>
            </div>
            {/* Define un campo de entrada para la contraseña */}
            <div className="input-group mb-3">
              <Form.Control type="password" name="password" placeholder="Password" onChange={ handleChange } />
              <div className="input-group-append">
              </div>
            </div>
            {/* Define un botón para iniciar sesión y un botón para registrarse */}
            <div className="row mr-3">
              <div className="col-md-6 mr-3">
                <div className='card-body row mr-3'>
                  <div className="col-md-6 caja">
                    <button type="submit" className='btn btn-primary btn-block mr-3' name='login'>Iniciar</button>
                    <button type="submit" className='btn btn-info btn-block btn-flat' name='register'>Register</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  }
  
  export default LoginPage;

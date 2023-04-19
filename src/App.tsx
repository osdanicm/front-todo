import './App.css';
import logo from './imagenes/todo_logo.png'
import ListaTareas from './componentes/listaTareas';
import React, { useState } from 'react';
import LoginPage from './componentes/login';

// Define la interfaz LoginProps que describe las propiedades que el componente espera recibir
interface LoginProps {
  onLogin: (user: string, id: number) => void;
}

// Define el componente App
function App() {
  // Utiliza la función useState de React para manejar el estado de inicio de sesión del usuario
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<string>('');
  const [userId, setIdUser] = useState<number>(0);

  // Verifica si el usuario ha iniciado sesión
  if(isLogged){
    // Si el usuario ha iniciado sesión, muestra la lista de tareas
    return (
      <div className="to-do_test">
        <div className='logo_contenedor'>
          <img 
            src={logo} 
            className='to-do_logo' />
        </div>
  
        <div className='tareas'>
          <h1>Mis tareas</h1>
          <div className='formulario_contenedor'>
            <ListaTareas idUser = { userId }/>
          </div>
        </div>
      </div>
    );
  }
  else{
    // Si el usuario no ha iniciado sesión, muestra el formulario de inicio de sesión
    return (
      <div className="to-do_test">
        <div className='logo_contenedor'>
          <img 
            src={logo}
            className='to-do_logo' />
        </div>
  
        <div className='tareas'>
          <div className='formulario_contenedor'>
            {/* Muestra el componente LoginPage y le pasa una función como propiedad para manejar el inicio de sesión del usuario */}
            <LoginPage onLogin={ (user: string, id: number) => {
              setIsLogged(true) ;
              setUserLogged(user);
              setIdUser(id);
            }}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
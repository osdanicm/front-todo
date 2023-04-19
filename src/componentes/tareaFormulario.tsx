import React,  {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/tareaFormulario.css';

// Define la interfaz ITarea que describe la estructura de una tarea
interface ITarea {
  id: number;
  texto: string;
  completada: number;
  idUser: number;
}

// Define la interfaz IProps que describe las propiedades que el componente espera recibir
interface IProps {
  onSubmit: (tareaNueva: ITarea) => void;
}

// Define el componente TareaFormulario
function TareaFormulario(props: IProps) {

  // Utiliza la función useState de React para manejar el estado del formulario
  const [input, setInput] = useState('');

  // Define la función manejarFormulario que se encarga de actualizar el estado del formulario
  const manejarFormulario = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

  };

  // Define la función manejarEnvio que se encarga de manejar el envío del formulario
  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Crea un nuevo objeto tareaNueva con los datos del formulario
    const tareaNueva = {
      id: 0,
      texto: input,
      completada: 0,
      idUser: 22,
    }
    // Llama a la función onSubmit pasándole el objeto tareaNueva como argumento
    props.onSubmit(tareaNueva);
  };

  // Devuelve un elemento form que contiene un campo de entrada y un botón para enviar el formulario
  return (
    <form 
      className='tare_formulario'
      onSubmit={manejarEnvio} >
      <div className="input-group input-group-sm">
        <div className="input-group input-group-sm">
          <input 
            className='form-control'
            type='text'
            placeholder='Escribe una tarea'
            name='texto'
            onChange={manejarFormulario}
          />
          <span className="input-group-append">
            <button className='btn btn-info btn-flat'>
              Agregar
            </button>
          </span>
        </div>
      </div>
    </form>
  );
}

export default TareaFormulario;
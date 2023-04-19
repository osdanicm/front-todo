import React from 'react';
import '../estilos/tarea.css';
import { AiOutlineCloseCircle } from "react-icons/ai";

// Define la interfaz IProps que describe las propiedades que el componente espera recibir
interface IProps {
  id: number;
  texto: string;
  completada: number;
  completarTarea: (id: number) => void;
  eliminarTarea: (id: number) => void;
}

// Define el componente Tarea
function Tarea({id, texto, completada, completarTarea, eliminarTarea }: IProps) {
  
  // Devuelve un elemento div que contiene el texto de la tarea y un icono para eliminar la tarea
  return (
    <div className={completada ? 'tarea_contenedor completada' : ' tarea_contenedor'}>
      <div 
        className='tarea_texto'
        onClick={() => completarTarea(id)} >
        {texto}
      </div>
      <div 
        className='tarea_contenedor_icono'
        onClick={() => eliminarTarea(id)} >
        <AiOutlineCloseCircle 
          className='tarea_icono' />
      </div>
    </div>
  );
}

export default Tarea;
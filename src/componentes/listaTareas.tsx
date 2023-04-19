import React, { useEffect, useState } from 'react';
import TareaFormulario from './tareaFormulario';
import Tarea from './tarea';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define la interfaz ITarea que describe la estructura de una tarea
interface ITarea {
  id: number;
  texto: string;
  completada: number;
  idUser: number;
}

// Define la interfaz IProps que describe las propiedades que el componente espera recibir
interface IProps {
  idUser: number;
}

// Define el componente ListaTareas
function ListaTareas({ idUser }: IProps) {

  // Utiliza la función useState de React para manejar el estado de la lista de tareas
  const [tareas, setTareas] = useState<ITarea[]>([]);

  // Utiliza la función useEffect de React para obtener la lista de tareas del servidor cuando el componente se monta
  useEffect(() => {
    async function getData() {
      const response = await axios.get(`http://localhost:5000/obtain?valor=${idUser}`);
      response.data.reverse();
      setTareas(response.data);
    }
    getData();
  }, []);

  // Define la función agregarTarea que se encarga de agregar una nueva tarea a la lista de tareas
  const agregarTarea = (tarea: ITarea) => {
    if (tarea.texto.trim()) {
      tarea.texto = tarea.texto.trim();
      tarea.idUser = idUser;

      // Envía una solicitud POST al servidor para guardar la nueva tarea
      axios.post('http://localhost:5000/saveTodo',tarea)
      .then(( { data } ) => {
        alert( data.messagge );
        async function getData() {
          const response = await axios.get(`http://localhost:5000/obtain?valor=${idUser}`);
          response.data.reverse();
          setTareas(response.data);
        }
        getData();
    })
    .catch(({ response }) => {
      if(!response){
        alert('No fue agregada');
      }
    })

    }
  };

  // Define la función eliminarTarea que se encarga de eliminar una tarea de la lista de tareas
  const eliminarTarea = (id: number) => {
    // Envía una solicitud POST al servidor para eliminar la tarea
    axios.post('http://localhost:5000/deleteTodo', { 'id': id })
    .then(( { data } ) => {
      alert( data.messagge );
      // Actualiza el estado de la lista de tareas para eliminar la tarea
      const tareaActualizada = tareas.filter(tarea =>tarea.id !== id);
      setTareas(tareaActualizada);
  })
  .catch(({ response }) => {
    if(!response){
      alert('Error al eliminar');
    }
  })
    
  };

  const completarTarea = (id: number) => {
    // Actualiza el estado de la lista de tareas para marcar la tarea como completada o no completada
    const tareaActualizada = tareas.map(tarea => {
      if (tarea.id === id) {
        tarea.completada = 1 - tarea.completada;
        // Envía una solicitud POST al servidor para actualizar el estado de la tarea
        axios.post('http://localhost:5000/update', tarea)
          .then(({ data }) => {
            alert(data.messagge);
          })
          .catch(({ response }) => {
            console.log(response);
          })
      }
      return tarea;
    });
    
    setTareas(tareaActualizada);
  };
  
  // Devuelve un elemento div que contiene un formulario para agregar tareas y una lista de tareas
  return (
    <div>
      <TareaFormulario onSubmit={agregarTarea} />
      <div className='lista_tareas_contenedor'>
        {
          // Muestra la lista de tareas utilizando el componente Tarea
          tareas.map((tarea) =>
            <Tarea 
              key={tarea.id}
              id={tarea.id}
              texto={tarea.texto}
              completada = {tarea.completada}
              eliminarTarea={eliminarTarea}
              completarTarea={completarTarea} />
          )
        }
      </div>
    </div>
  );
  }
  
  export default ListaTareas;
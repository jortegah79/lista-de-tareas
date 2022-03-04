import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tareas: [],     
      indice: -1
    }
    this.crear = this.crear.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.seleccionar = this.seleccionar.bind(this);
  }
  crear(e) {
    let textoTarea = document.getElementById("tarea").value.toUpperCase();
    let comentarioTarea = document.getElementById("comentarios").value;
    if (textoTarea.length > 0 && comentarioTarea.length > 0) {
      this.setState(
        { tareas: [...this.state.tareas, { tarea: textoTarea, comentarios: comentarioTarea }] });
    } else if (textoTarea.length > 0) {
      this.setState(
        { tareas: [...this.state.tareas, { tarea: textoTarea, comentarios: comentarioTarea }] });
    }
    document.getElementById("tarea").value = '';
    document.getElementById("comentarios").value = '';
  }
  editar() {
    if (this.state.indice !== -1) {
      let arr = this.state.tareas;
      let index = this.state.indice;
      arr[index].tarea = document.getElementById("tarea").value.toUpperCase();
      arr[index].comentarios = document.getElementById("comentarios").value;
      if(arr[index].tarea.length!==0)
        this.setState({
          tareas: arr,
          indice: -1
        })
        document.getElementById("tarea").value = '';
        document.getElementById("comentarios").value = ''; 
      }
      
    }
    eliminar() {
      if (this.state.indice !== -1) {
        let arr = this.state.tareas;
        let index = this.state.indice;
        
        arr.splice(index,1);
        this.setState({
          tareas: arr,
          indice: -1
        })
      }
      document.getElementById("tarea").value = '';
    document.getElementById("comentarios").value = '';
    }
    seleccionar(e) {
      let indice = e.target.id;
      if (indice < this.state.tareas.length && indice !== -1) {
        this.setState({
          indice: indice
        })
      }
    }
    render() {
      return (
        <div className='container col-10 col-xs-8 col-xl-6 bg-danger bordeRedondo'>
          <Titulo titulo="LISTA DE TAREAS" />
          <Entrada />
          <Botones nuevo={this.crear} editar={this.editar} borrar={this.eliminar} indice={this.state.indice} />
          <Tareas tareas={this.state.tareas} click={this.seleccionar} />
        </div>
      );
    }
  }

  const Titulo = props => <div className='container'>
    <h1 id="titulo" className='text-center text-white mt-5 p-3'>{props.titulo}</h1></div>

  const Entrada = (props => {
    return (
      <div className='row justify-content-center container'>
        <input type="text" placeholder="Introduce una nueva tarea..." id="tarea" className='bg-danger col-10 text-light'></input>
        <textarea placeholder='Introduce comentarios ...' id="comentarios" rows={2} className='bg-danger col-10 m-3 text-light'></textarea>
      </div>
    );
  })
  const Botones = props => {
    let estilos;
    if (props.indice !== -1) {
      estilos = 'bg-warning col-3 col-xs-3 col-md-2 btn btn-light m-2 text-danger btn-sm';

    } else {
      estilos = 'col-3 col-xs-3 col-md-2 btn btn-light m-2 text-danger btn-sm';
    }
    return (
      <div className='row container justify-content-between justify-content-md-end'>
        <button id="nueva" onClick={props.nuevo} className='col-3 col-xs-3 col-md-2 btn btn-light m-2 text-danger btn-sm' disabled={props.indice !== -1 ? true : false}>NUEVA</button>
        <button id="editar" onClick={props.editar} className={estilos}>EDITAR</button>
        <button id="borrar" onClick={props.borrar} className={estilos}>BORRAR</button>
      </div>
    );
  }
  const Tareas = props => {
    const lista = props.tareas.map((elem, ind) => {
      return (
        <li key={ind} onClick={props.click} placeholder="pincha aqui" >
          <h4 id={ind} className='text-white' >{elem.tarea}</h4>
          <p className='text-warning'>{elem.comentarios}</p>
        </li>
      )
    });
    return (
      <div className='container col-10 mt-3'>
        {props.tareas.length !== 0 && <h3 className='text-light'>Tareas:</h3>}
        <ul>{lista}</ul></div>
    );
  }

ReactDOM.render(
  <React.StrictMode>
  <Agenda />
  </React.StrictMode >,
  document.getElementById('root')
);

reportWebVitals();

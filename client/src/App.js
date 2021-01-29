
import './App.css';
import { useState } from "react";
import Axios from "axios";
function App() {
  const [nombre, setNombre]= useState("");
  const [apellidos, setApellidos]= useState("");
  const [correo, setCorreo]= useState("");
  const [telefono, setTelefono]= useState("");
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const agregarUsuario =()  => {
    Axios.post('http://localhost:3001/agregar',
    {nombre:nombre,
    apellidos:apellidos, 
    correo:correo,
    telefono:telefono
  }).then(()=>{
    mostrarUsuarios();
  });
  };
  const mostrarUsuarios =()  => {
    Axios.get('http://localhost:3001/usuarios').then((respuesta)=>{
      setListaUsuarios (respuesta.data);
    });
  };
  const buscarInicio =()  => {
    Axios.post('http://localhost:3001/buscarInicio',
    {nombre : document.getElementById("nombre").value,
    apellidos : document.getElementById("apellidos").value,
    correo : document.getElementById("correo").value,
    telefono : document.getElementById("telefono").value 
  }
    ).then((respuesta)=>{
      setListaUsuarios (respuesta.data);
    });
  };
  const buscarMedio =()  => {
    Axios.post('http://localhost:3001/buscarMedio',
    {nombre : document.getElementById("nombre").value,
    apellidos : document.getElementById("apellidos").value,
    correo : document.getElementById("correo").value,
    telefono : document.getElementById("telefono").value 
  }
    ).then((respuesta)=>{
      setListaUsuarios (respuesta.data);
    });
  };
  const buscarFin =()  => {
    Axios.post('http://localhost:3001/buscarFin',
    {nombre : document.getElementById("nombre").value,
    apellidos : document.getElementById("apellidos").value,
    correo : document.getElementById("correo").value,
    telefono : document.getElementById("telefono").value 
  }
    ).then((respuesta)=>{
      setListaUsuarios (respuesta.data);
    });
  };
  const preparaActualizaUsuario =(idp,nombrep,apellidosp,correop,telefonop)  => {
    document.getElementById("id").value = idp;
    document.getElementById("nombre").value = nombrep;
    document.getElementById("apellidos").value = apellidosp;
    document.getElementById("correo").value = correop;
    document.getElementById("telefono").value = telefonop;
    document.getElementById("btnact").onclick = function(){
      
      document.getElementById("btnact").onclick =function() {
        return false;
      }
      Axios.put('http://localhost:3001/actualizar',{
        id: idp,
        nombre : document.getElementById("nombre").value,
        apellidos : document.getElementById("apellidos").value,
        correo : document.getElementById("correo").value,
        telefono : document.getElementById("telefono").value 
      }).then((respuesta)=>{
        setListaUsuarios (listaUsuarios.map((val) => {
          return val.id === idp
            ? {
                id: val.id,
                nombre: val.nombre,
                apellidos: val.apellidos,
                correo: val.correo,
                telefono: val.telefono
              }
            : val;
        }));
      }); 
      document.getElementById("id").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("apellidos").value = "";
      document.getElementById("correo").value = "";
      document.getElementById("telefono").value = "";
      };
  };
  const borraUsuario =(id)  => {
    Axios.delete(`http://localhost:3001/borrar/${id}`).then((respuesta)=>{
      setListaUsuarios (listaUsuarios.filter((val)=>{
        return val.id !== id;
      })
      );
    });
  };

  return (
    <div className="App">
    <section id="title">
    <div className="container-fluid">
      <nav className="navbar  navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="#">CRUD Usuarios</a>
      </nav>
      <h1>Bienvenido al CRUD de Usuarios<br/><br/>Agregar/Buscar/Editar Usuarios</h1>
      <div className="form-inline">
        <input type="text" id="id" readOnly className="form-control" />
        <div className="form-group mx-sm-3 mb-2">
          <input type="text" id="nombre" className="form-control"  onChange={(event)=>{
            setNombre(event.target.value);
          }} placeholder="Nombre" />
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <input type="text" id="apellidos" className="form-control" onChange={(event)=>{
            setApellidos(event.target.value);
          }} placeholder="Apellidos"/>
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <input type="email" id="correo" className="form-control"  onChange={(event)=>{
            setCorreo(event.target.value);
          }} placeholder="Correo"/>
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <input type="tel" id="telefono" className="form-control" onChange={(event)=>{
            setTelefono(event.target.value);
          }} placeholder="Teléfono"/>
        </div>
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Agregar/Buscar/Editar
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button  className="btn btn-light " onClick={agregarUsuario} ><i className="fas fa-user-plus"></i> Insertar Usuario Nuevo</button>
            <button  className="btn btn-light " onClick={buscarInicio} ><i className="fas fa-search"></i> Buscar al Inicio</button>
            <button  className="btn btn-light " onClick={buscarMedio} ><i className="fas fa-search"></i> Buscar en Medio</button>
            <button  className="btn btn-light " onClick={buscarFin} ><i className="fas fa-search"></i> Buscar al Final</button>
            <button  className="btn btn-light " id="btnact" ><i className="fas fa-user-plus"></i> Actualizar</button>
            </div>
        
      </div>
    </div>
  </section>
  <section id="users">
    <button  className="btn btn-primary mb-2" onClick={mostrarUsuarios} ><i className="fas fa-search"></i> Mostrar Usuarios</button>
    <table className="table table-hover table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Correo</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
      {listaUsuarios.map((val,key) => {
        return(
          <tr>
          <th scope="row">{val.id}</th>
          <td>{val.nombre}</td>
          <td>{val.apellidos}</td>
          <td>{val.correo}</td>
          <td>{val.telefono}</td>
          <td><button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Acciones
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={(event)=>{borraUsuario(val.id)}}>Eliminar</a>
              <a className="dropdown-item" onClick={(event)=>{preparaActualizaUsuario(val.id,val.nombre,val.apellidos,val.correo,val.telefono)}}>Editar</a>
            </div>
          </td>
        </tr>)
    })}
      </tbody>
    </table>
  </section>
  </div>
  );
}

export default App;

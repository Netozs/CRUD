const express = require ('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "sql5388735",
    host: "sql5.freemysqlhosting.net",
    password: "5yFmFyb2rY",
    database : "sql5388735",
});
app.post('/agregar',(req,res)=>{
    const nombre = req.body.nombre
    const apellidos = req.body.apellidos
    const correo= req.body.correo
    const telefono = req.body.telefono
    db.query('INSERT INTO usuarios(nombre,apellidos,correo,telefono) values(?,?,?,?)',
    [nombre,apellidos,correo,telefono],
    (err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send("Usuario Agregado")
        }
    });
});
app.get('/usuarios',(req,res)=>{
    db.query ("SELECT * FROM usuarios",
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
app.post('/buscarInicio',(req,res)=>{
    const nombre = req.body.nombre
    const apellidos = req.body.apellidos
    const correo= req.body.correo
    const telefono = req.body.telefono
    console.log (nombre,apellidos);
    var agregar= ""
    if (nombre){
        agregar+=" nombre like '"+nombre+"%' and"
    }else{
        agregar+=" nombre like nombre and"
    }
    if (apellidos){
        agregar+=" apellidos like '"+apellidos+"%' and"
    }else{
        agregar+=" apellidos like apellidos and"
    }
    if (correo){
        agregar+=" correo like '"+correo+"%' and"
    }else{
        agregar+=" correo like correo and"
    }
    if (telefono){
        agregar+=" telefono like '"+telefono+"%' and"
    }else{
        agregar+=" telefono like telefono"
    }
    console.log("SELECT * FROM usuarios WHERE "+agregar);
    db.query ("SELECT * FROM usuarios WHERE "+agregar,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
app.post('/buscarMedio',(req,res)=>{
    const nombre = req.body.nombre
    const apellidos = req.body.apellidos
    const correo= req.body.correo
    const telefono = req.body.telefono
    console.log (nombre,apellidos);
    var agregar= ""
    if (nombre){
        agregar+=" nombre like '%"+nombre+"%' and"
    }else{
        agregar+=" nombre like nombre and"
    }
    if (apellidos){
        agregar+=" apellidos like '%"+apellidos+"%' and"
    }else{
        agregar+=" apellidos like apellidos and"
    }
    if (correo){
        agregar+=" correo like '%"+correo+"%' and"
    }else{
        agregar+=" correo like correo and"
    }
    if (telefono){
        agregar+=" telefono like '%"+telefono+"%' and"
    }else{
        agregar+=" telefono like telefono"
    }
    console.log("SELECT * FROM usuarios WHERE "+agregar);
    db.query ("SELECT * FROM usuarios WHERE "+agregar,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
app.post('/buscarFin',(req,res)=>{
    const nombre = req.body.nombre
    const apellidos = req.body.apellidos
    const correo= req.body.correo
    const telefono = req.body.telefono
    console.log (nombre,apellidos);
    var agregar= ""
    if (nombre){
        agregar+=" nombre like '%"+nombre+"' and"
    }else{
        agregar+=" nombre like nombre and"
    }
    if (apellidos){
        agregar+=" apellidos like '%"+apellidos+"' and"
    }else{
        agregar+=" apellidos like apellidos and"
    }
    if (correo){
        agregar+=" correo like '%"+correo+"' and"
    }else{
        agregar+=" correo like correo and"
    }
    if (telefono){
        agregar+=" telefono like '%"+telefono+"' and"
    }else{
        agregar+=" telefono like telefono"
    }
    console.log("SELECT * FROM usuarios WHERE "+agregar);
    db.query ("SELECT * FROM usuarios WHERE "+agregar,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
app.put('/actualizar',(req,res)=>{
    const id = req.body.id
    const nombre = req.body.nombre
    const apellidos = req.body.apellidos
    const correo= req.body.correo
    const telefono = req.body.telefono
    
    db.query ("UPDATE usuarios SET nombre=?, apellidos=?,correo=?,telefono=? WHERE id=?",
    [nombre,apellidos,correo,telefono,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
app.delete('/borrar/:id',(req,res)=>{
    const id = req.params.id;
    db.query ("DELETE FROM usuarios WHERE id=?",id, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
});

app.listen(3001, ()=>{
    console.log("Servidor corriendo en puerto 3001")
});

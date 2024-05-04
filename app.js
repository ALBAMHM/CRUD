const express = require('express');
const app = express();
const PORT = 3000;

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ejemplo
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];
//Obtener siguiente ID
const obtenerSiguienteId = () => {
    const ultimaId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id : 0;
    return ultimaId + 1;
};

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Obtener un usuario por nombre
app.get('/usuarios/:nombre', (req, res) => {
    const nombreUsuario = req.params.nombre;
    const usuario = usuarios.find(user => user.nombre === nombreUsuario);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

// Crear un nuevo usuario
app.post('/usuarios', (req, res) => {
    
    const nuevoUsuario = req.body;
    nuevoUsuario.id = obtenerSiguienteId();// Asignar la siguiente ID contigua!!!!!!!!!!!
    usuarios.push(nuevoUsuario);
    res.status(201).send('Usuario creado correctamente');
});

// Actualiza información de un usuario por nombre
app.put('/usuarios/:nombre', (req, res) => {
    const nombreUsuario = req.params.nombre;
    const indice = usuarios.findIndex(user => user.nombre === nombreUsuario);
    if (indice !== -1) {
        usuarios[indice] = req.body;
        res.send('Usuario actualizado correctamente');
    } else {
        res.status(404).send('Usuario no encontrado, eror 404');
    }
});

// Eliminar un usuario 
app.delete('/usuarios/:nombre', (req, res) => {
    const nombreUsuario = req.params.nombre;
    usuarios = usuarios.filter(user => user.nombre !== nombreUsuario);
    res.send('Usuario eliminado correctamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
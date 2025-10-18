const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let sistemaAtivo = false;

let cursos = [
    { id: 1, nome: 'Curso de JavaScript', vagas: 5, inscritos: [] },
    { id: 2, nome: 'Curso de Python', vagas: 3, inscritos: [] },
    { id: 3, nome: 'Curso de HTML/CSS', vagas: 4, inscritos: [] }
];

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.emit('sistema.status', sistemaAtivo);

    socket.on('sistema.ativar', () => {
        sistemaAtivo = true;
        io.emit('sistema.status', sistemaAtivo);
        console.log('Sistema ativado');
    });

    socket.on('sistema.desativar', () => {
        sistemaAtivo = false;
        io.emit('sistema.status', sistemaAtivo);
        console.log('Sistema desativado');
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

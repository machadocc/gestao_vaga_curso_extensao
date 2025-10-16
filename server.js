const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;

app.use(express.static('public'));

let cursos = [
    { id: 1, nome: 'Curso de Web', vagas: 3, inscritos: [] },
    { id: 2, nome: 'Curso de Python', vagas: 2, inscritos: [] },
    { id: 3, nome: 'Curso de UX/UI', vagas: 1, inscritos: [] },
];

io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.id);

    socket.emit('sistema.iniciado', cursos);

    socket.on('vaga.reservada', ({ cursoId, nome }) => {
        const curso = cursos.find(c => c.id === cursoId);

        if (!curso || curso.vagas <= 0) {
            socket.emit('erro.operacao', 'Vaga indisponível');
            return;
        }

        curso.vagas--;
        const reserva = { nome, tempo: Date.now() };
        curso.inscritos.push(reserva);

        io.emit('vaga.confirmada', cursos);

        setTimeout(() => {
            const index = curso.inscritos.findIndex(i => i.nome === nome && Date.now() - i.tempo >= 5000);
            if (index !== -1) {
                curso.inscritos.splice(index, 1);
                curso.vagas++;
                io.emit('vaga.expirada', cursos);
            }
        }, 5000);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
    });
});

http.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

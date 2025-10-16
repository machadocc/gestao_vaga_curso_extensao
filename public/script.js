const socket = io();
const divCursos = document.getElementById('cursos');

socket.on('sistema.iniciado', (cursos) => {
    renderCursos(cursos);
});

socket.on('vaga.confirmada', (cursos) => {
    renderCursos(cursos);
});

socket.on('vaga.expirada', (cursos) => {
    renderCursos(cursos);
});

socket.on('erro.operacao', (mensagem) => {
    alert(mensagem);
});

function renderCursos(cursos) {
    divCursos.innerHTML = '';
    cursos.forEach(curso => {
        const div = document.createElement('div');
        div.className = 'curso';

        div.innerHTML = `
            <h2>${curso.nome}</h2>
            <p>Vagas disponíveis: ${curso.vagas}</p>
            <p>Inscritos: ${curso.inscritos.map(i => i.nome).join(', ') || 'Nenhum'}</p>
            <input type="text" placeholder="Seu nome" id="nome-${curso.id}">
            <button onclick="reservar(${curso.id})" ${curso.vagas === 0 ? 'disabled' : ''}>Reservar Vaga</button>
        `;
        divCursos.appendChild(div);
    });
}

function reservar(cursoId) {
    const input = document.getElementById(`nome-${cursoId}`);
    const nome = input.value.trim();
    if (!nome) {
        alert('Digite seu nome');
        return;
    }

    socket.emit('vaga.reservada', { cursoId, nome });
    input.value = '';
}

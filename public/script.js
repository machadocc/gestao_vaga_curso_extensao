const socket = io();
const divCursos = document.getElementById('cursos');
const statusSistema = document.getElementById('statusSistema');

let sistemaAtivo = false;

let cursos = [
    { id: 1, nome: 'Curso de JavaScript', vagas: 5, inscritos: [] },
    { id: 2, nome: 'Curso de Python', vagas: 3, inscritos: [] },
    { id: 3, nome: 'Curso de HTML/CSS', vagas: 4, inscritos: [] }
];

socket.on('sistema.status', (ativo) => {
    sistemaAtivo = ativo;
    statusSistema.textContent = 'Status: ' + (ativo ? 'Ativo' : 'Inativo');
    statusSistema.className = ativo ? 'status ativo' : 'status inativo';
    renderCursos(cursos);
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
            <input type="text" placeholder="Seu nome" id="nome-${curso.id}" ${!sistemaAtivo ? 'disabled' : ''}>
            <button onclick="reservar(${curso.id})" ${curso.vagas === 0 || !sistemaAtivo ? 'disabled' : ''}>
                Reservar Vaga
            </button>
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
    const curso = cursos.find(c => c.id === cursoId);
    if (!sistemaAtivo) {
        alert('O sistema está inativo!');
        return;
    }
    if (curso.vagas <= 0) {
        alert('Não há vagas disponíveis!');
        return;
    }
    curso.inscritos.push({ nome });
    curso.vagas--;
    renderCursos(cursos);
    input.value = '';
}

renderCursos(cursos);

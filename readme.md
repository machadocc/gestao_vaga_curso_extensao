# 🧠 Sistema de Gestão de Vagas – Cursos de Extensão

Projeto desenvolvido por **Cristhian Eduardo Machado** e **Yan Lopes**  
Disciplina: Programação Web com Node.js  
Professor: Ademar Perfoll Junior

---

## 🚀 Como executar o projeto

1. **Instalar dependências:**
   ```bash
   npm install

    Executar o servidor:

node server.js

Acessar no navegador:

    Participante: http://localhost:3000

Administrador: http://localhost:3000/admin.html
💡 Descrição do sistema

O sistema permite gerenciar vagas em cursos de extensão em tempo real.
Os usuários podem visualizar cursos disponíveis e reservar uma vaga, enquanto o servidor atualiza todas as telas conectadas via Socket.io.
O administrador pode ativar ou desativar o sistema, controlando quando os participantes podem fazer reservas.
📝 Funcionalidades
Participante

    Visualizar cursos e vagas disponíveis.

    Reservar uma vaga quando o sistema estiver ativo.

Administrador

    Ativar ou desativar o sistema.

    O status do sistema é atualizado em tempo real para todos os participantes.

📡 Eventos Socket.io
Direção	Evento	Função
client → server	sistema.ativar	Ativa o sistema
client → server	sistema.desativar	Desativa o sistema
server → client	sistema.status	Atualiza status do sistema em tempo real
👨‍💻 Autores

Cristhian Eduardo Machado
Yan Lopes


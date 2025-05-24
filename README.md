# Projeto Integrador em Computação III - PJI310 - Turma 001
## DRP11-PJI310-SALA-001GRUPO-006

# ✅ Gerenciador de Tarefas com Supabase

Sistema de gerenciamento de tarefas desenvolvido em **React**, com autenticação via **Supabase**, voltado para organização de atividades e gestão pessoal.


## 🧩 Funcionalidades

- Cadastro e login de usuários com Supabase Auth
- Criação de tarefas com:
  - Título
  - Descrição
  - Prioridade (baixa, média, alta)
  - Status (pendente, em andamento, concluída)
- Edição e exclusão de tarefas
- Barra de progresso com percentual de tarefas concluídas
- Atualização de nome e senha
- Exclusão segura de conta (remove dados do usuário e faz logout)

## 🛠️ Tecnologias utilizadas

- [React](https://reactjs.org/)
- [Supabase](https://supabase.com/)
- React Router DOM
- Font Awesome
- CSS tradicional

## 🚀 Deploy

🔗 Projeto online: [https://colabtask-production.up.railway.app/](https://colabtask-production.up.railway.app/)

## 📷 Capturas de tela (opcional)

> Adicione imagens aqui se desejar (ex: tela de login, dashboard, formulário de tarefas)

## 📂 Estrutura do projeto

```bash
/src
  /Componentes         # Cabeçalhos, botões, inputs e ícones reutilizáveis
  /Pages               # Login, Cadastro, Dashboard, MeuCadastro
  /styles              # Estilos CSS separados
  supabaseClient.js    # Arquivo de conexão com o Supabase
  App.js               # Gerenciamento de rotas
```

## 🧪 Como executar localmente

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
REACT_APP_SUPABASE_URL=https://seu-projeto.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sua-chave-publica-anon
```

4. Execute o projeto:

```bash
npm start
```

A aplicação abrirá em `http://localhost:3000`

## 🔐 Roteamento principal

| Caminho           | Componente         | Descrição                         |
|-------------------|--------------------|-----------------------------------|
| `/`               | Login              | Tela de login                     |
| `/cadastro`       | Cadastro           | Criação de conta                  |
| `/dashboard`      | DashboardTarefas   | Painel com lista de tarefas       |
| `/meucadastro`    | MeuCadastro        | Atualização de senha e nome       |
| `/sobrenos`       | SobreNos           | Página institucional              |

## 👥 Integrantes do Grupo

- **Simoni | Polo: Nova Granada-SP | Curso: Bacharelado em Tecnologia da Informação**
- **Nelita | Polo: Catanduva-SP | Curso: Ciência de Dados**
- **Rosicleidi | Polo: Palmares Paulista-SP | Curso: Bacharelado em Tecnologia da Informação**
- **Deusliane | Polo: Paulo de Faria-SP | Curso: Engenharia da Computação**

Trabalho desenvolvido para apresentação na **UNIVESP** (Universidade Virtual do Estado de São Paulo), como parte do **Projeto Integrador**.

## 📄 Licença

Este projeto tem fins educacionais e está disponível para uso livre com atribuição.

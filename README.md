# FilaFácil 📋

> Sistema de Agendamento Inteligente — MVP Acadêmico para Processos de Negócio

![FilaFácil](https://img.shields.io/badge/FilaFácil-MVP-00B4D8?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28?style=for-the-badge&logo=firebase)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)

---

## 📌 Sobre o projeto

FilaFácil é um sistema web de agendamento de atendimentos com controle de fila, voltado para trabalhos acadêmicos de Processos de Negócio. Permite que usuários agendem horários e que administradores gerenciem o fluxo completo de atendimento.

---

## ✨ Funcionalidades

### Autenticação
- ✅ Cadastro de usuário
- ✅ Login com e-mail e senha
- ✅ Logout
- ✅ Sessão persistente (Firebase Auth)

### Usuário
- ✅ Visualizar dashboard com estatísticas
- ✅ Criar novo agendamento
- ✅ Visualizar horários disponíveis em tempo real
- ✅ Cancelar agendamento
- ✅ Editar nome no perfil

### Admin
- ✅ Aprovar agendamentos pendentes
- ✅ Rejeitar agendamentos
- ✅ Finalizar atendimentos
- ✅ Visualizar lista completa com filtros

### Dashboard
- ✅ Total de agendamentos
- ✅ Pendentes / Aprovados / Concluídos
- ✅ Acesso rápido às funcionalidades

---

## 🗂️ Estrutura de Pastas

```
filafacil/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AppointmentCard.jsx   # Card reutilizável de agendamento
│   │   ├── AppointmentCard.css
│   │   ├── Navbar.jsx            # Barra de navegação
│   │   ├── Navbar.css
│   │   └── LoadingSpinner.jsx    # Indicador de carregamento
│   ├── contexts/
│   │   └── AuthContext.jsx       # Contexto de autenticação
│   ├── firebase/
│   │   └── config.js             # Configuração do Firebase
│   ├── pages/
│   │   ├── Splash.jsx / .css     # Tela de entrada
│   │   ├── Login.jsx             # Login
│   │   ├── Register.jsx          # Cadastro
│   │   ├── Auth.css              # CSS compartilhado das páginas de auth
│   │   ├── Home.jsx / .css       # Dashboard
│   │   ├── NewAppointment.jsx / .css  # Novo agendamento
│   │   ├── MyAppointments.jsx / .css  # Meus agendamentos
│   │   ├── AdminPanel.jsx / .css      # Painel admin
│   │   ├── Profile.jsx / .css    # Perfil do usuário
│   │   └── NotFound.jsx / .css   # Página 404
│   ├── routes/
│   │   ├── AppRoutes.jsx         # Definição de rotas
│   │   └── PrivateRoute.jsx      # Proteção de rotas
│   ├── services/
│   │   ├── authService.js        # Login, Cadastro, Logout
│   │   ├── appointmentService.js # CRUD de agendamentos
│   │   └── userService.js        # Atualização de perfil
│   ├── styles/
│   │   ├── global.css            # Design system completo
│   │   └── spinner.css           # Loading spinner
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ instalado
- Conta no Firebase (gratuita)
- Git instalado

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/filafacil.git
cd filafacil
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do Firebase (veja abaixo).

### 4. Execute o projeto
```bash
npm run dev
```

Acesse: **http://localhost:3000**

---

## 🔥 Configuração do Firebase

### Passo 1 — Criar projeto
1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"**
3. Nome: `filafacil` → Avançar → Criar projeto

### Passo 2 — Ativar Authentication
1. No menu lateral: **Authentication → Começar**
2. Aba **"Sign-in method"**
3. Habilite **"E-mail/senha"** → Salvar

### Passo 3 — Criar Firestore
1. No menu lateral: **Firestore Database → Criar banco de dados**
2. Selecione **"Modo de teste"** (para desenvolvimento)
3. Escolha a região (ex: `us-east1`) → Concluído

### Passo 4 — Registrar app Web
1. No menu lateral: **⚙️ Configurações do projeto**
2. Role até **"Seus apps"** → clique em `</>`
3. Nome do app: `filafacil-web` → Registrar app
4. Copie as credenciais do `firebaseConfig`

### Passo 5 — Preencher o .env
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=filafacil.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=filafacil
VITE_FIREBASE_STORAGE_BUCKET=filafacil.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Passo 6 — Criar usuário Admin
Após criar uma conta normal no app, acesse o **Firestore Console**:
1. Coleção `users` → encontre seu documento
2. Edite o campo `role` de `"user"` para `"admin"`

### Regras Firestore recomendadas (para produção)
No Firestore → Regras, cole:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null;
    }
    match /appointments/{appointmentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
  }
}
```

---

## 🗄️ Estrutura do Banco de Dados

### Coleção: `users`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | UID do Firebase Auth |
| `nome` | string | Nome completo |
| `email` | string | E-mail do usuário |
| `role` | string | `"user"` ou `"admin"` |
| `createdAt` | timestamp | Data de criação |

### Coleção: `appointments`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID gerado automaticamente |
| `userId` | string | UID do usuário |
| `nomeCliente` | string | Nome do cliente |
| `horario` | string | Formato `"YYYY-MM-DDTHH:MM"` |
| `status` | string | `pendente`, `aprovado`, `cancelado`, `finalizado` |
| `createdAt` | timestamp | Data de criação |

---

## 🌐 Deploy na Vercel

### Opção 1 — Via GitHub (recomendado)
1. Suba o projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) → New Project
3. Importe o repositório
4. Em **Environment Variables**, adicione todas as variáveis do `.env`
5. Clique em **Deploy** → ✅ Pronto!

### Opção 2 — Via CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```
Siga as instruções e configure as variáveis de ambiente quando solicitado.

### Build manual
```bash
npm run build
# Pasta "dist/" gerada — faça upload em qualquer hospedagem estática
```

---

## 📋 Status do sistema / Fluxo

```
Usuário cria agendamento → status: "pendente"
         ↓
Admin aprova → status: "aprovado"
Admin rejeita → status: "cancelado"
         ↓
Admin finaliza → status: "finalizado"

Usuário pode cancelar quando: "pendente" ou "aprovado"
```

---

## 🛠️ Scripts disponíveis

```bash
npm run dev      # Servidor de desenvolvimento (porta 3000)
npm run build    # Build para produção (pasta dist/)
npm run preview  # Preview do build local
```

---

## 🧩 Stack

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | 18.x | Interface |
| Vite | 5.x | Bundler |
| Firebase Auth | 10.x | Autenticação |
| Firestore | 10.x | Banco de dados |
| React Router DOM | 6.x | Roteamento |
| CSS puro | — | Estilização |

---

## ✅ Checklist Final

- [ ] Firebase projeto criado
- [ ] Authentication habilitado (E-mail/senha)
- [ ] Firestore criado em modo de teste
- [ ] Arquivo `.env` preenchido
- [ ] `npm install` executado
- [ ] `npm run dev` rodando em localhost:3000
- [ ] Conta criada e login funcionando
- [ ] Agendamento criado com sucesso
- [ ] Usuário promovido a admin no Firestore
- [ ] Painel admin acessível
- [ ] Deploy na Vercel com variáveis de ambiente

---

## 👨‍💻 Desenvolvimento

Projeto desenvolvido como MVP acadêmico para a disciplina de **Processos de Negócio**.

**Licença:** MIT
"# teste" 

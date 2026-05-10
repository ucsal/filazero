# 🚀 Guia Rápido de Desenvolvimento — FilaFácil

## Funcionalidades Implementadas

### ✅ Autenticação
- Cadastro com Email/Senha
- Login com persistência de sessão
- Logout
- Validação de senhas
- Contexto de autenticação global

### ✅ Agendamentos (Usuários)
- Criar agendamento com horário
- Visualizar horários disponíveis (30 em 30 minutos, 08h-17h30)
- Visualizar meus agendamentos filtrados por status
- Cancelar agendamento (se pendente ou aprovado)

### ✅ Admin
- Painel administrativo com visão geral
- Aprovar agendamentos pendentes
- Rejeitar agendamentos
- Finalizar atendimentos
- Filtros por status
- Estatísticas em tempo real

### ✅ Perfil
- Editar nome
- Visualizar informações pessoais
- Indicador de função (Admin/Usuário)
- Logout

### ✅ Dashboard
- Estatísticas de agendamentos
- Agendamentos recentes
- Quick links para navegação
- Contexto diferente para admin e usuário

---

## 🎯 Fluxo de Uso

### Usuário Normal

```
1. Cadastro → Cria conta com Email/Senha
2. Login → Acessa dashboard
3. Novo Agendamento → Escolhe data e horário
4. Aguarda Aprovação → Status "pendente"
5. Admin aprova → Status "aprovado"
6. Pode cancelar até 1h antes
7. Admin finaliza → Status "finalizado"
```

### Administrador

```
1. Mesmo cadastro (depois promova em Firestore)
2. Acesso ao Painel Admin
3. Visualiza todos os agendamentos
4. Aprova/Rejeita pendentes
5. Finaliza aprovados
6. Métricas em tempo real
```

---

## 📝 Estrutura de Dados

### Users (Firestore)
```json
{
  "id": "uid-do-firebase",
  "nome": "Nome do Usuário",
  "email": "email@example.com",
  "role": "user|admin",
  "createdAt": "2024-05-09T10:30:00Z"
}
```

### Appointments (Firestore)
```json
{
  "id": "doc-id",
  "userId": "uid-do-usuario",
  "nomeCliente": "Nome da Pessoa",
  "horario": "2024-05-15T14:30",
  "status": "pendente|aprovado|finalizado|cancelado",
  "createdAt": "2024-05-09T10:30:00Z"
}
```

---

## 🛠️ Scripts Disponíveis

```bash
npm run dev       # Inicia servidor de desenvolvimento (localhost:3000)
npm run build     # Faz build para produção (pasta dist/)
npm run preview   # Visualiza o build localmente
```

---

## 🔑 Variáveis de Ambiente (.env)

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=filafacil-19c35.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=filafacil-19c35
VITE_FIREBASE_STORAGE_BUCKET=filafacil-19c35.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=305302968877
VITE_FIREBASE_APP_ID=1:305302968877:web:96bae3b5d4beb05b35f6a4
```

---

## 🧠 Como Virar Admin

Depois de criar sua primeira conta:

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Vá para **Firestore Database**
3. Clique em coleção **users**
4. Encontre seu documento (pelo seu UID)
5. Edite o campo `role`: altere de `"user"` para `"admin"`
6. Recarregue o app em `localhost:3000`

Pronto! Agora você tem acesso ao painel admin com ícone ⬢ no menu.

---

## 🐛 Debug Útil

### Verificar Horários Carregando
- Abra **DevTools (F12) → Console**
- Vá para novo agendamento
- Procure por `"Firebase config loaded"` ou erros

### Verificar Agendamentos Salvos
- Firebase Console → Firestore Database
- Veja a coleção **appointments**
- Procure por um documento com seu `userId`

### Limpar Cache
- `Ctrl+Shift+Delete` → Limpar cookies/cache
- Ou use DevTools → Application → Clear Storage

---

## 📱 Páginas Principais

| Rota | Função |
|------|--------|
| `/` | Dashboard (Home) |
| `/cadastro` | Registro de novo usuário |
| `/login` | Login |
| `/novo-agendamento` | Criar agendamento |
| `/meus-agendamentos` | Listar meus agendamentos |
| `/admin` | Painel administrativo (apenas admin) |
| `/perfil` | Meu perfil |
| `/*` | Página 404 |

---

## 🚀 Pronto para Começar!

Se tudo está funcionando:
- ✅ Crie uma conta
- ✅ Agende um horário
- ✅ Promova para admin
- ✅ Aprove seu próprio agendamento
- ✅ Finalize o atendimento

Aproveite! 🎉

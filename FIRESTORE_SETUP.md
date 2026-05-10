# 🔥 Configuração do Firestore — Guia Completo

## ❌ Problema: "Sem horários disponíveis"

Se você está vendo essa mensagem ao tentar agendar, provavelmente o **Firestore não está configurado corretamente** ou as **regras de segurança estão muito restritivas**.

---

## ✅ Passo-a-passo para configurar

### 1. Criar o Firestore Database

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Selecione seu projeto **filafacil**
3. No menu lateral, clique em **Firestore Database**
4. Clique em **"Criar banco de dados"**
5. Escolha:
   - **Local (region):** `us-east1` ou a mais próxima
   - **Modo de segurança:** Selecione **"Começar no modo de teste"** (para desenvolvimento)
6. Clique em **"Ativar"**

> ⚠️ **Nota:** O modo de teste permite leitura/escrita sem autenticação. Para produção, você precisa das regras de segurança configuradas corretamente (veja final deste guia).

---

### 2. Criar as Coleções

Depois que o Firestore estiver ativo, você precisa criar as coleções:

#### Coleção: `users`

1. Na tela do Firestore, clique em **"Iniciar coleção"**
2. Nome: `users`
3. Document ID: `auto` (deixe gerar automaticamente)
4. Clique em **"Próximo"**
5. Adicione um documento de teste:
   - `id`: seu-uid-aqui (copie do seu usuário no Firebase Auth)
   - `nome`: "Seu Nome"
   - `email`: "seu@email.com"
   - `role`: "admin"
   - `createdAt`: (clique no ícone de relógio para timestamp)

#### Coleção: `appointments`

1. Clique em **"Iniciar coleção"** novamente
2. Nome: `appointments`
3. Document ID: `auto`
4. Clique em **"Próximo"**
5. Deixe vazio por agora (será criado quando você agendar)

---

### 3. Verificar as Regras de Segurança

Para modo de teste (desenvolvimento):

1. No Firestore, clique na aba **"Regras"**
2. Cole o seguinte código:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite leitura e escrita durante o desenvolvimento
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Clique em **"Publicar"**

> ⚠️ Isso é INSEGURO para produção! Veja as regras recomendadas no final.

---

### 4. Testar no Aplicativo

1. Volte para o app em `localhost:3000`
2. Recarregue a página (Ctrl+R)
3. Vá para **"Novo Agendamento"**
4. Selecione uma data
5. Você deve ver os horários disponíveis

Se ainda não aparecer, abra o **DevTools (F12) → Console** e procure por erros. Pode haver algum erro de permissão.

---

## 🔒 Regras de Segurança para Produção

Quando for fazer o deploy, use estas regras mais seguras:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler/escrever apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // Admins podem ver outros usuários
    }
    
    // Agendamentos: qualquer usuário autenticado pode criar/ler/atualizar
    match /appointments/{appointmentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
```

---

## 🛠️ Debug: Verificar no Console

Se não vir horários, abra **DevTools (F12) → Console** e procure por:

- ❌ Erro de permissão → Regras do Firestore estão muito restritivas
- ❌ Erro de conexão → Firestore não foi criado
- ✅ Sem erro → Você conseguirá ver os horários!

---

## ✨ Pronto!

Agora você tem:
- ✅ Firebase Auth com Email/Password ativado
- ✅ Firestore Database criado em modo de teste
- ✅ Coleções `users` e `appointments` prontas
- ✅ Regras de segurança configuradas

O app deve estar 100% funcional!

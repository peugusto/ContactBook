## 📓 ContactBook Project  

<p>Bem-vindo ao repositório do projeto ContactBook, uma aplicação Full Stack desenvolvida na arquitetura MVC para aprimorar e desafiar meu conhecimento, as funcionabilidade desse projeto é gerenciar e armazenar contatos de usuários de forma segura, incluindo funcionalidades de autenticação, CRUD de contatos e tambem registrar e logar usuarios, com suas senhas salvas criptografadas no Atlas.</p>

---


![Image](https://github.com/user-attachments/assets/d7be5015-1211-46bf-a76d-73b9537153fe)


---

## 💻 Tecnologias Utilizadas 

| Categoria | Tecnologia |
| :--- | :--- |
| **Backend** | Node.js, Express |
| **Frontend** | React, Toastify, Vite , React-Router, React-Hook-Form |
| **Banco de Dados** | MongoDB Atlas |
| **ODM** | Mongoose |
| **Autenticação** | Middlewares personalizados |
| **Criptografia** | bcrypt |
| **Teste API** | POSTMAN |


---

# 📄 Endpoints da API

## **Usuários**

| Método | Endpoint    | Descrição                           | Autenticação |
|--------|-------------|-------------------------------------|--------------|
| POST   | `/users`    | Cria um novo usuário                | ❌ Não       |
| POST   | `/login`    | Faz login do usuário                | ❌ Não       |
| GET    | `/auth`     | Verifica se o usuário está autenticado | ❌ Não    |
| POST   | `/logout`   | Encerra a sessão do usuário         | ✅ Sim       |

## **Contatos**

| Método | Endpoint         | Descrição                      | Autenticação |
|--------|------------------|--------------------------------|--------------|
| GET    | `/contacts`      | Lista todos os contatos        | ✅ Sim       |
| GET    | `/contacts/:id`  | Retorna um contato específico  | ✅ Sim       |
| POST   | `/contacts`      | Adiciona um novo contato       | ✅ Sim       |
| PATCH  | `/contacts/:id`  | Edita um contato existente     | ✅ Sim       |
| DELETE | `/contacts`      | Deleta um contato              | ✅ Sim       |

---

> **Observação:** As rotas de contatos utilizam o middleware `isAuth` para proteger o acesso com sessões. Validações de entrada são aplicadas em `/users` e `/contacts` via middlewares `inputValidation` e `contactValidation`.

---




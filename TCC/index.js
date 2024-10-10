const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt'); // Para verificar a senha
const prisma = require('@prisma/client').PrismaClient; // Para acessar o banco de dados

const app = express();
const db = new prisma();

// Configuração do EJS como view engine
app.set('view engine', 'ejs');
// diretório onde  as views estão localizadas (opcional)
app.set('views', path.join(__dirname, 'views'));



app.use(express.urlencoded({ extended: true })); // Para dados de formulários
app.use(express.json()); // Para dados JSON

// Configuração do middleware de sessão
app.use(session({
    secret: 'seu-segredo-aqui', // Troque por um segredo forte
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));


app.use((req, res, next) => {
  res.locals.usuarioLogado = req.session.userId ? true : false; // Verifica se o usuário está logado
  res.locals.usuarioFoto = req.session.userFoto || ''; // Pega a foto do usuário, se existir
  res.locals.userName = req.session.userName || ''; // Pega o nome do usuário, se existir
  next(); // Chama o próximo middleware ou rota
});

app.use(routes);

app.listen(3000,()=>{
    console.log("Servidor Escutando na porta 3000");
})
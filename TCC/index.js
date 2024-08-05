const express = require('express');
const session = require('express-session');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


    app.use(
        session({
        secret: 'sua_chave_secreta',
        resave: false,
        saveUninitialized: true,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    // Configuração do Passport (estratégia local)
passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'senha',
      },
      async (email, senha, done) => {
        try {
          const user = await prisma.tb_usuarios.findUnique({
            where: {
              email,
            },
          });
          console.log(user);
  
          if (!user || senha !== senha) {
            return done(null, false, { message: 'Email ou senha inválidos.' });
          }
  
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.tb_usuarios.findUnique({
        where: {
          id,
        },
      });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  

// const router = require('./routes/cadastroRoute');
const loginRoute = require('./routes/loginRoute');
app.use('/login', loginRoute);

const multer = require('multer');
const path = require('path');

const UsuarioController = require('./controllers/usuarioController');
const usuarioController = new UsuarioController();

const LoginController = require('./controllers/loginController');
const loginController = new LoginController();


app.use(express.urlencoded({extended: true}));
    app.set('view engine', 'ejs');





    // Cadastro de Usuário

    //configurar o multer
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'public/fotos'); // arquivos serão salvos neste diretório
        },
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`); // gerar um nome diferente para arquivo
        },
      });
      const upload = multer({ storage });
      
      // Rota de cadastro com upload de foto
      app.post('/cadastro', upload.single('foto'), (req, res) => {
        usuarioController.cadastrarUsuario(req, res);
      });


      app.get('/cadastro', (req, res) => {
        res.render('cadastro');
    });





    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.post('/login', loginController.postLogin);






    app.get('/',function(req,res){
    res.render('main.ejs');
});

app.get('/futebol',function(req,res){
    res.render('futebol.ejs');
});

app.get('/handebol',function(req,res){
    res.render('handbol.ejs');
});

app.get('/volei',function(req,res){
    res.render('volei.ejs');
});

app.get('/basquete',function(req,res){
    res.render('basquete.ejs');
});

app.get('/esportes',function(req,res){
    res.render('esportes.ejs');
});

app.listen(3000,function(){
    console.log("Servidor Escutando na porta 3000");
})
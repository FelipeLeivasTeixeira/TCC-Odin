const express = require('express');
const app = express();
// const router = require('../routes/cadastroRoute');
const multer = require('multer');
const path = require('path');

const UsuarioController = require('./controllers/usuarioController');
const usuarioController = new UsuarioController();



app.use(express.urlencoded({extended: true}))
    app.set('view engine', 'ejs')




    // app.use('/cadastro', router);
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'public/'); // arquivos serão salvos neste diretório
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



    
    app.get('/',function(req,res){
    res.render('main.ejs');
});


app.get('/login',function(req,res){
    res.render('login.ejs');
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
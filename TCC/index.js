const express = require('express');
const app = express();


app.use(express.urlencoded({extended: true}))
    app.set('view engine', 'ejs')


    
    app.get('/',function(req,res){
    res.render('main.ejs');
});



app.get('/cadastro',function(req,res){
    res.render('cadastro.ejs');
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


app.listen(3000,function(){
    console.log("Servidor Escutando na porta 3000");
})
const express = require('express');
const router = express.Router();
const prisma = require('@prisma/client').PrismaClient; // Importa o Prisma Client
const upload = require('../upload'); // Importa o middleware do multer
const bcrypt = require('bcrypt'); // para hash

const db = new prisma();

// Rota para cadastrar usuário
router.post('/cadastro', upload.single('foto'), async (req, res) => {
  const { nome, email, senha } = req.body;
  const arquivo = req.file ? req.file.filename : null; // Salva apenas o nome do arquivo

  try {

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10); // O número 10 é o salt rounds

    const usuario = await db.tb_usuarios.create({
      data: {
        nome,
        email,
        senha: hashedPassword, // Armazena a senha hashada
        arquivo,
      },
    });
    res.redirect('/login'); // Redireciona após cadastro bem-sucedido
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar usuário');
  }
});
// fim da rota para cadastrar usuário

// rota de login

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Busca o usuário pelo email
        const usuario = await db.tb_usuarios.findUnique({
            where: { email }
        });

        // Verifica se o usuário existe e se a senha está correta
        if (usuario && await bcrypt.compare(senha, usuario.senha)) {
            // Armazena informações do usuário na sessão
            req.session.userId = usuario.id;
            req.session.userName = usuario.nome; // Armazena o nome do usuário, se necessário
             req.session.userFoto = usuario.arquivo; // Armazena o caminho da foto de perfil

            return res.redirect('/'); // Redireciona para a página inicial ou outra página desejada
        } else {
            return res.render('login', { error: 'Email ou senha incorretos.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao fazer login.');
    }
});


// rota para logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/'); // Redireciona em caso de erro
        }

        res.clearCookie('connect.sid'); // Limpa o cookie da sessão
        res.redirect('/'); // Redireciona para a página inicial ou outra página desejada
    });
});


// Outras Rotas

router.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/', (req, res) => {
    res.render('main.ejs');
  });

router.get('/futebol', (req, res) => {
  res.render('futebol.ejs');
});

router.get('/handebol', (req, res) => {
  res.render('handbol.ejs');
});

router.get('/volei', (req, res) => {
  res.render('volei.ejs');
});

router.get('/basquete', (req, res) => {
  res.render('basquete.ejs');
});

router.get('/esportes', (req, res) => {
  res.render('esportes.ejs');
});

router.get('/sobre', (req, res) => {
  res.render('sobre.ejs');
});

router.get('/forumFut', (req, res) => {
  res.render('forumFut.ejs');
});

router.get('/forumHand', (req, res) => {
  res.render('forumHand.ejs');
});

router.get('/forumVol', (req, res) => {
  res.render('forumVol.ejs');
});

router.get('/forumBas', (req, res) => {
  res.render('forumBas.ejs');
});

router.get('/perfil', (req, res) => {
    res.render('perfil.ejs');
  });

router.get('/teste-login', (req, res) => {
    if (req.session.userId) {
        res.send(`Você está logado como ${req.session.userName}.`);
    } else {
        res.send('Você não está logado.');
    }
});

// Exporta o router
module.exports = router;
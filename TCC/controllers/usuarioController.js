const UsuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

class UsuarioController {
  async cadastrarUsuario(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const foto = req.file;

      const usuarioModel = new UsuarioModel();
      const usuario = await usuarioModel.criarUsuario(nome, email, senha, foto);

      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Não foi possível cadastrar o usuário');
    }
  }
}

module.exports = UsuarioController;
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class LoginController {
  getLogin = (req, res) => {
    res.render('login', { error: req.flash('error') });
  };

  postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        req.flash('error', info.message);
        return res.redirect('/login');
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        res.redirect('/');
      });
    })(req, res, next);
  };

  logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/login');
    });
  };
}

module.exports = LoginController;

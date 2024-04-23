import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import db from '../models/index.js';

const User = db.user;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No Token provided!"
    });
  }

  jwt.verify(
    token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return catchError(err, res);
      }
      req.userId = decoded.id;
      next();
    }
  );
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {

      for (let index = 0; index < roles.length; index++) {
        if (roles[index].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });

      return;
    })
  })
}

const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let index = 0; index < roles.length; index++) {
        if (roles[index].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
}

const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let index = 0; index < roles.length; index++) {
        if (roles[index].name === "moderator") {
          next();
          return;
        }

        if (roles[index].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

export default {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
import db from '../models/index.js';

const ROLES = db.ROLES;
const User = db.user;

export const checkDuplicateUsernameOrEmail = (req, res, next) => {

  // Email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in user!"
      });
      return;
    }

    next();
  });

}

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let index = 0; index < req.body.roles.length; index++) {
      if (!ROLES.includes(req.body.roles[index])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[index]
        });
        return;
      }
    }
  }

  next();
}
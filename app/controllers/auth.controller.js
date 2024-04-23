import db from '../models/index.js';
import config from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import nodemailer from 'nodemailer';
import nodemailerConfig from '../config/nodemailer.config.js';

const { user: User, role: Role, refreshToken: RefreshToken } = db;

const Op = db.Sequelize.Op;

export const signup = async (req, res) => {

  const { email, password } = req.body;
  User.create({
    email: email,
    password: bcrypt.hashSync(password, 8)
  })
    .then(async user => {

      const transporter = nodemailer.createTransport(nodemailerConfig);

      const info = await transporter.sendMail({
        from: nodemailerConfig.auth.user,
        to: email,
        subject: 'Email Verification | LockLeaks',
        text: `
        Hi ,
        
        Thanks for getting started with LockLeaks!
        
        We need a little more information to complete your registration, including a confirmation of your email address.
        
        Click below to confirm your email address:
        
        [link]
        
        If you have problems, please paste the above URL into your web browser.`,
        html: "<p>Hi<br/><br/> Thanks for getting started with LockLeaks!<br/><br/>We need a little more information to complete your registration, including a confirmation of your email address.<br/><br/>Click below to confirm your email address:<br/>[link]<br/><br/>If you have problems, please paste the above URL into your web browser.</p>"
      });

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      let refreshToken = await RefreshToken.createToken(user);
      user.setRoles([1]).then(() => {

        res.status(200).send({
          username: user.username,
          email: user.email,
          roles: ['user'],
          accessToken: token,
          refreshToken: refreshToken,
        });

      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
}

export const signin = async (req, res) => {

  const { email, password } = req.body

  User.findOne({
    where: {
      email: email
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      let refreshToken = await RefreshToken.createToken(user);

      user.getRoles().then(roles => {

        res.status(200).send({
          email: user.email,
          roles: roles.map((role) => role.name),
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

export const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({
      message: "Refresh Token is required!"
    });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    console.log(refreshToken)

    if (!refreshToken) {
      res.status(403).json({
        message: "Refresh token is not in database!"
      });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({
      message: err
    });
  }
};
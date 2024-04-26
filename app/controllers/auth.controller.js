import db from '../models/index.js';
import config from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import ElasticEmail from '@elasticemail/elasticemail-client';
import elasticEmailConfig from '../config/elasticEmail.config..js';
import authConfig from '../config/auth.config.js';

let defaultClient = ElasticEmail.ApiClient.instance;

let apikey = defaultClient.authentications['apikey'];
apikey.apiKey = "0DB5ECD47CD2E0E29C03F8D73B7B07DF4DC19B94BEAC3B1AA0A59C5EA983D359EEA7C209680E82D451CE91B369DF0561"

let api = new ElasticEmail.EmailsApi()

const { user: User, refreshToken: RefreshToken } = db;

export const signup = async (req, res) => {

  const { email, password } = req.body;
  User.create({
    email: email,
    password: bcrypt.hashSync(password, 8),
    verified: false
  })
    .then(async user => {

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      let refreshToken = await RefreshToken.createToken(user);

      let emailContent = ElasticEmail.EmailMessageData.constructFromObject({
        Recipients: [
          new ElasticEmail.EmailRecipient(email)
        ],
        Content: {
          Body: [
            ElasticEmail.BodyPart.constructFromObject({
              ContentType: "HTML",
              Content: `<div>Hi<br/><br/> Thanks for getting started with LockLeaks!<br/><br/>We need a little more information to complete your registration, including a confirmation of your email address.<br/><br/>Click below to confirm your email address:<br/><br/><br/><a href="https:/copyrightfixer.com/auth/verify-email/${token}" style="padding: 10px 20px; background: rgb(0, 140, 255); border-radius: 5px; color: white; text-decoration: none; border: none; cursor: pointer;" >Verify Email</a><br/><br/></div>`
            })
          ],
          Subject: "Email Verification | LockLeaks",
          From: elasticEmailConfig.auth.user,
        }
      });

      var callback = function (error, data, response) {
        if (error) {
          console.error(error);
        } else {
          console.log('API called successfully.');

          user.setRoles([1]).then(() => {

            res.status(200).send({
              email: user.email,
              roles: ['user'],
              accessToken: token,
              refreshToken: refreshToken,
            });

          });

        }
      };

      api.emailsPost(emailContent, callback);

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

export const verifyEmail = async (req, res) => {
  const { token: token } = req.body;

  if (token == null) {
    return res.status(403).json({
      message: "Token is required!"
    });
  }

  try {

    let decoded = jwt.verify(token, authConfig.secret);

    const user = await User.findOne({
      where: {
        id: decoded.id
      }
    });

    user.update({ verified: true });

    return res.status(200).json({
      message: "User verified Successfully"
    });
  } catch (err) {
    return res.status(500).send({
      message: err
    });
  }
};

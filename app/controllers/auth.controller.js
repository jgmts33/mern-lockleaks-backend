import db from '../models/index.js';
import config from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import axios from 'axios';

import ElasticEmail from '@elasticemail/elasticemail-client';
import elasticEmailConfig from '../config/elasticEmail.config..js';
import authConfig from '../config/auth.config.js';
import { OAuth2Client } from 'google-auth-library';
import { Client, auth } from "twitter-api-sdk"

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

      const token = jwt.sign({
        email: user.email
      }, config.secret, {
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
              Content: `<div>Hi<br/><br/> Thanks for getting started with LockLeaks!<br/><br/>We need a little more information to complete your registration, including a confirmation of your email address.<br/><br/>Click below to confirm your email address:<br/><br/><br/><a href="https://copyrightfixer.com/auth/verify-email/${token}" style="padding: 10px 20px; background: rgb(0, 140, 255); border-radius: 5px; color: white; text-decoration: none; border: none; cursor: pointer;" >Verify Email</a><br/><br/></div>`
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
              name: user.name,
              avatar: user.avatar,
              verified: user.verified,
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

      const token = jwt.sign({ email: user.email }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      let refreshToken = await RefreshToken.createToken(user);

      user.getRoles().then(roles => {

        res.status(200).send({
          email: user.email,
          roles: roles.map((role) => role.name),
          name: user.name,
          avatar: user.avatar,
          verified: user.verified,
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
    let newAccessToken = jwt.sign({ email: user.email }, config.secret, {
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
        email: decoded.email
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

export const forgotPassword = async (req, res) => {

  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email
    }
  });

  if (user) {

    const token = jwt.sign({ email: user.email }, config.secret, {
      expiresIn: config.jwtExpiration
    });

    let emailContent = ElasticEmail.EmailMessageData.constructFromObject({
      Recipients: [
        new ElasticEmail.EmailRecipient(email)
      ],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: `<div>Hi<br/><br/> To reset your password, click on the button below:<br/><br/><br/><a href="https://copyrightfixer.com/auth/reset-password?token=${token}" style="padding: 10px 20px; background: rgb(0, 140, 255); border-radius: 5px; color: white; text-decoration: none; border: none; cursor: pointer;" >Reset Password</a><br/><br/></div>`
          })
        ],
        Subject: "Reset Password | LockLeaks",
        From: elasticEmailConfig.auth.user,
      }
    });

    var callback = function (error, data, response) {
      if (error) {
        console.error(error);
      }

      else res.status(200).send({
        message: "Reset Password Link Sent"
      });

    };

    api.emailsPost(emailContent, callback);
  }

  else return res.status(500).send({
    message: "User Not Found!"
  });

}

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (token == null) {
    return res.status(403).json({
      message: "Token is required!"
    });
  }

  try {

    let decoded = jwt.verify(token, authConfig.secret);

    const user = await User.findOne({
      where: {
        email: decoded.email
      }
    });

    user.update({ password: bcrypt.hashSync(password, 8) });

    return res.status(200).json({
      message: "Password Updated Successfully!"
    });
  } catch (err) {
    return res.status(500).send({
      message: err
    });
  }
};

export const googleAuthenticateUser = async (req, res) => {

  console.log("process.env.GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

  const googleClient = new OAuth2Client({
    clientId: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    redirectUri: 'https://copyrightfixer.com/auth/google'
    // redirectUri: 'http://localhost:3000/auth/google',

  });

  const authorizationUrl = googleClient.generateAuthUrl({
    access_type: 'offline', // Needed to receive a refresh token
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/plus.me'
    ],
    prompt: 'select_account',
    include_granted_scopes: true,
    enable_granular_consent: true
  });


  const { code } = req.body;

  const tokens = await googleClient.getToken(code);
  const decodedProfileInfo = jwt.decode(tokens.tokens.id_token);

  let user = await User.findOne({ where: { email: decodedProfileInfo?.email } });

  if (!user) {
    user = await User.create({
      email: decodedProfileInfo?.email,
      avatar: decodedProfileInfo?.picture,
      name: decodedProfileInfo?.name,
      verified: true,
      roles: ['user']
    });

    await user.setRoles([1]);
  }

  let refreshToken = await RefreshToken.createToken(user);

  res.status(200).send({
    email: user.email,
    roles: ['user'],
    name: user.name,
    avatar: user.avatar,
    accessToken: tokens.tokens.id_token,
    refreshToken: refreshToken,
  });
}

export const facebookAuthenticateUser = async (req, res) => {
  const { code } = req.body;

  const { data } = await axios({
    url: 'https://graph.facebook.com/v4.0/oauth/access_token',
    method: 'get',
    params: {
      client_id: process.env.FACEBOOK_APP_ID,
      client_secret: process.env.FACEBOOK_APP_SECRET,
      redirect_uri: 'https://copyrightfixer.com/auth/facebook',
      code
    }
  });

  const accessToken = data?.access_token || '';

  if (accessToken) {
    const { userData } = await axios({
      url: 'https://graph.facebook.com/me',
      method: 'get',
      params: {
        fields: ['id', 'email', 'first_name', 'last_name', 'picture'].join(','),
        access_token: accessToken
      }
    });

    let user = await User.findOne({ where: { email: userData?.email } });

    if (!user) {
      user = await User.create({
        email: userData?.email,
        avatar: userData?.picture,
        name: `${userData?.first_name} ${userData?.last_name}`,
        verified: true,
        roles: ['user']
      });

      await user.setRoles([1]);
    }

    let refreshToken = await RefreshToken.createToken(user);

    res.status(200).send({
      email: user.email,
      roles: ['user'],
      name: user.name,
      avatar: user.avatar,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

  }
}

export const twitterAuthenticateUser = async (req, res) => {
  const { code } = req.body;

  const authClient = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID,
    client_secret: process.env.TWITTER_CLIENT_SECRET,
    callback: 'https://copyrightfixer.com/auth/twitter',
    scopes: ["users.read", "tweet.read", "follows.read", "follows.write"].join(" "),
  })
  const client = new Client(authClient)

  authClient.generateAuthURL({
    state: "state",
    code_challenge: "challenge",
    code_challenge_method: "plain",
  })
  await authClient.requestAccessToken(code);

  const { data: twitterUser } = await client.users.findMyUser()

  let user = await User.findOne({ where: { email: twitterUser?.email } });

  if (!user) {
    user = await User.create({
      email: twitterUser?.email,
      avatar: twitterUser?.picture,
      name: `${twitterUser.username}`,
      verified: true,
      roles: ['user']
    });

    await user.setRoles([1]);
  }

  let refreshToken = await RefreshToken.createToken(user);

  res.status(200).send({
    email: user.email,
    roles: ['user'],
    name: user.name,
    avatar: user.avatar,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });

}
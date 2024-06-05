import db from '../models/index.js';
import config from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { io } from "../../server.js";

import ElasticEmail from '@elasticemail/elasticemail-client';
import elasticEmailConfig from '../config/elasticEmail.config..js';
import authConfig from '../config/auth.config.js';
import { OAuth2Client } from 'google-auth-library';
import { Client, auth } from "twitter-api-sdk"

let defaultClient = ElasticEmail.ApiClient.instance;

let apikey = defaultClient.authentications['apikey'];
apikey.apiKey = elasticEmailConfig.auth.apiKey

let api = new ElasticEmail.EmailsApi()

const { user: User, refreshToken: RefreshToken, subscriptionOptions: SubscriptionOptions } = db;

export const signup = async (req, res) => {

  const { email, password } = req.body;
  User.create({
    email: email,
    password: bcrypt.hashSync(password, 8),
    verified: false,
    avatar: "",
    subscription: {
      payment_method: null,
      expire_date: null,
      plan_id: null,
      status: ''
    },
    social: ""
  })
    .then(async user => {

      io.emit(`admin:dashboardInfo`, 'scan-finished');
      // TODO : check the email is veried or

      const token = jwt.sign(
        {
          id: user.id
        },
        config.secret,
        {
          expiresIn: config.jwtExpiration,
        }
      );

      let refreshToken = await RefreshToken.createToken(user);

      let emailContent = ElasticEmail.EmailMessageData.constructFromObject({
        Recipients: [
          new ElasticEmail.EmailRecipient(email)
        ],
        Content: {
          Body: [
            ElasticEmail.BodyPart.constructFromObject({
              ContentType: "HTML",
              Content: `<div>Hi<br/><br/> Thanks for getting started with LockLeaks!<br/><br/>We need a little more information to complete your registration, including a confirmation of your email address.<br/><br/>Click below to confirm your email address:<br/><br/><br/><a href="https://lockleaks.com/auth/verify-email/${token}" style="padding: 10px 20px; background: rgb(0, 140, 255); border-radius: 5px; color: white; text-decoration: none; border: none; cursor: pointer;" >Verify Email</a><br/><br/></div>`
            })
          ],
          Subject: "Email Verification | LockLeaks",
          From: elasticEmailConfig.auth.authEmail,
        }
      });

      var callback = function (error, data, response) {
        if (error) {
          console.error(error);
        } else {
          console.log('API called successfully.');

          user.setRoles([1]).then(() => {

            res.status(200).send({
              id: user.id,
              email: user.email,
              roles: ['user'],
              name: user.name,
              avatar: user.avatar,
              verified: user.verified,
              subscription: user.subscription,
              tokens: {
                access: {
                  token: token,
                  expires: new Date(Number(new Date()) + config.jwtExpiration * 1000)
                },
                refresh: {
                  token: refreshToken,
                  expires: refreshToken.expires
                }
              },
              ban: user.ban,
              contract: user.contract,
              copyright_holder: user.copyright_holder
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

export const sendEmailVerification = async (req, res) => {
  const { email, id } = req.body;

  const token = jwt.sign(
    {
      id
    },
    config.secret,
    {
      expiresIn: config.jwtExpiration,
    }
  );

  try {
    let emailContent = ElasticEmail.EmailMessageData.constructFromObject({
      Recipients: [
        new ElasticEmail.EmailRecipient(email)
      ],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: `<div>Hi<br/><br/> Thanks for getting started with LockLeaks!<br/><br/>We need a little more information to complete your registration, including a confirmation of your email address.<br/><br/>Click below to confirm your email address:<br/><br/><br/><a href="https://lockleaks.com/auth/verify-email/${token}" style="padding: 10px 20px; background: rgb(0, 140, 255); border-radius: 5px; color: white; text-decoration: none; border: none; cursor: pointer;" >Verify Email</a><br/><br/></div>`
          })
        ],
        Subject: "Email Verification | LockLeaks",
        From: elasticEmailConfig.auth.authEmail,
      }
    });

    var callback = function (error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully.');

        res.status(200).send({
          message: "Email Sent again!"
        });

      }
    };

    api.emailsPost(emailContent, callback);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}

export const signin = async (req, res) => {

  const { email, password, admin } = req.body

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

      let refreshToken = await RefreshToken.createToken(user);

      let subscription = user.subscription;

      if (user.subscription.plan_id) {
        const subscriptionFeatures = await SubscriptionOptions.findByPk(user.subscription.plan_id);
        subscription = {
          payment_method: user.subscription.payment_method,
          expire_date: user.subscription.expire_date,
          plan_id: user.subscription.plan_id,
          status: user.subscription.status,
          features: subscriptionFeatures
        }
      }

      user.getRoles().then(roles => {

        if (admin && !roles.find(p => p.name == "admin")) {
          return res.status(404).send({ message: "You are not Admin." });
        }

        const expiresIn = roles.map((role) => role.name).find(p => p == 'admin') ? config.adminJwtExpiration : config.jwtExpiration;

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: expiresIn,
        });

        res.status(200).send({
          id: user.id,
          email: user.email,
          roles: roles.map((role) => role.name),
          name: user.name,
          avatar: user.avatar,
          verified: user.verified,
          subscription: subscription,
          social: user.social,
          tokens: {
            access: {
              token: token,
              expires: new Date(Number(new Date()) + expiresIn * 1000)
            },
            refresh: {
              token: refreshToken.token,
              expires: refreshToken.expires
            }
          },
          ban: user.ban,
          contract: user.contract,
          copyright_holder: user.copyright_holder
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
      tokens: {
        access: {
          token: newAccessToken,
          expires: new Date(Number(new Date()) + config.jwtExpiration * 1000)
        },
        refresh: {
          token: refreshToken.token,
          expires: refreshToken.expires
        }
      }
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

    const user = await User.findByPk(decoded.id);

    let subscription = user.subscription;

    if (user.subscription.plan_id) {
      const subscriptionFeatures = await SubscriptionOptions.findByPk(user.subscription.plan_id);
      subscription = {
        payment_method: user.subscription.payment_method,
        expire_date: user.subscription.expire_date,
        plan_id: user.subscription.plan_id,
        status: user.subscription.status,
        features: subscriptionFeatures
      }
    }

    if (user) {
      user.update({ verified: true });

      let refreshToken = await RefreshToken.createToken(user);

      return res.status(200).send({
        id: user.id,
        email: user.email,
        roles: user.role,
        name: user.name,
        avatar: user.avatar,
        verified: user.verified,
        subscription: subscription,
        social: user.social,
        tokens: {
          access: {
            token,
            expires: new Date(Number(new Date()) + config.jwtExpiration * 1000)
          },
          refresh: {
            token: refreshToken.token,
            expires: refreshToken.expires
          }
        },
        ban: user.ban,
        contract: user.contract,
        copyright_holder: user.copyright_holder
      });
    } else {
      return res.status(500).send({
        message: "Invalid Token!"
      });
    }

  } catch (err) {
    console.log(err);
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

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
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
        From: elasticEmailConfig.auth.authEmail,
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

    const user = await User.findByPk(decoded.id);

    if (user) {
      user.update({ password: bcrypt.hashSync(password, 8) });

      return res.status(200).json({
        message: "Password Updated Successfully!"
      });
    }

    return res.status(404).json({
      message: "User not Found!"
    });

  } catch (err) {
    console.log("err", err);
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

  googleClient.generateAuthUrl({
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

  console.log("decodedProfileInfo:", decodedProfileInfo);
  if (!user) {
    user = await User.create({
      email: decodedProfileInfo?.email,
      avatar: decodedProfileInfo?.picture,
      name: decodedProfileInfo?.name,
      verified: true,
      roles: ['user'],
      subscription: {
        payment_method: null,
        expire_date: null
      },
      social: "google"
    });

    io.emit(`admin:dashboardInfo`, 'scan-finished');

    await user.setRoles([1]);
  }

  let refreshToken = await RefreshToken.createToken(user);

  let subscription = user.subscription;

  if (user.subscription.plan_id) {
    const subscriptionFeatures = await SubscriptionOptions.findByPk(user.subscription.plan_id);
    subscription = {
      payment_method: user.subscription.payment_method,
      expire_date: user.subscription.expire_date,
      plan_id: user.subscription.plan_id,
      status: user.subscription.status,
      features: subscriptionFeatures
    }
  }

  res.status(200).send({
    id: user.id,
    email: user.email,
    roles: ['user'],
    name: user.name,
    avatar: user.avatar,
    verified: user.verified,
    subscription: subscription,
    social: user.social,
    tokens: {
      access: {
        token: tokens.tokens.id_token,
        expires: tokens.tokens.expiry_date
      },
      refresh: {
        token: refreshToken.token,
        expires: refreshToken.expires
      }
    },
    ban: user.ban,
    contract: user.contract,
    copyright_holder: user.copyright_holder
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
  const expires = data?.expiry_date || new Date(Number(new Date()) + config.jwtExpiration * 1000);

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
        roles: ['user'],
        subscription: {
          payment_method: null,
          expire_date: null
        },
        social: "facebook"
      });

      io.emit(`admin:dashboardInfo`, 'scan-finished');

      await user.setRoles([1]);
    }

    let refreshToken = await RefreshToken.createToken(user);

    let subscription = user.subscription;

    if (user.subscription.plan_id) {
      const subscriptionFeatures = await SubscriptionOptions.findByPk(user.subscription.plan_id);
      subscription = {
        payment_method: user.subscription.payment_method,
        expire_date: user.subscription.expire_date,
        plan_id: user.subscription.plan_id,
        status: user.subscription.status,
        features: subscriptionFeatures
      }
    }

    res.status(200).send({
      id: user.id,
      email: user.email,
      roles: ['user'],
      name: user.name,
      avatar: user.avatar,
      verified: user.verified,
      subscription: subscription,
      tokens: {
        access: {
          token: accessToken,
          expires: expires
        },
        refresh: {
          token: refreshToken.token,
          expires: refreshToken.expires
        }
      },
      ban: user.ban,
      contract: user.contract,
      copyright_holder: user.copyright_holder
    });

  }
}

export const twitterAuthenticateUser = async (req, res) => {
  const { code } = req.body;

  const authClient = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID,
    client_secret: process.env.TWITTER_CLIENT_SECRET,
    callback: 'https://copyrightfixer.com/auth/twitter',
    scopes: ["users.read", "tweet.read", "follows.read", "follows.write"],
  })
  const client = new Client(authClient)

  authClient.generateAuthURL({
    state: "twitter-state",
    code_challenge: "challenge",
    code_challenge_method: "plain",
    prompt: 'consent',
    incluse_granted_scopes: true,
    enable_granular_consent: true
  })
  const accessToken = await authClient.requestAccessToken(code);

  const { data: twitterUser } = await client.users.findMyUser()

  console.log("twitterUser:", twitterUser);

  let user = await User.findOne({ where: { email: twitterUser?.id } });

  if (!user) {
    user = await User.create({
      email: twitterUser?.id,
      avatar: twitterUser?.profile_image_url,
      name: `${twitterUser.name}`,
      verified: true,
      roles: ['user'],
      subscription: {
        payment_method: null,
        expire_date: null
      },
      social: "twitter"
    });

    io.emit(`admin:dashboardInfo`, 'scan-finished');

    await user.setRoles([1]);
  }

  let refreshToken = await RefreshToken.createToken(user);

  let subscription = user.subscription;

  if (user.subscription.plan_id) {
    const subscriptionFeatures = await SubscriptionOptions.findByPk(user.subscription.plan_id);
    subscription = {
      payment_method: user.subscription.payment_method,
      expire_date: user.subscription.expire_date,
      plan_id: user.subscription.plan_id,
      status: user.subscription.status,
      features: subscriptionFeatures
    }
  }

  res.status(200).send({
    id: user.id,
    email: user.email,
    roles: ['user'],
    name: user.name,
    avatar: user.avatar,
    verified: user.verified,
    subscription: subscription,
    social: user.social,
    tokens: {
      access: {
        token: accessToken,
        expires: new Date(Number(new Date()) + config.jwtExpiration * 1000)
      },
      refresh: {
        token: refreshToken.token,
        expires: refreshToken.expires
      }
    },
    ban: user.ban,
    contract: user.contract,
    copyright_holder: user.copyright_holder
  });

}
import { Sequelize, where } from "sequelize";
import db from "../models/index.js";

let defaultClient = ElasticEmail.ApiClient.instance;

import ElasticEmail from '@elasticemail/elasticemail-client';
import elasticEmailConfig from '../config/elasticEmail.config..js';

let apikey = defaultClient.authentications['apikey'];
apikey.apiKey = elasticEmailConfig.auth.apiKey

let api = new ElasticEmail.EmailsApi()

const { user: User, scrapeSummary: ScrapeSummary, subscriptionOptions: SubscriptionOptions } = db;

export const getUserInfo = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let subscription = user.subscription;

      if (user.subscription.plan_id) {
        const subscriptionFeatures = await SubscriptionOptions.findByPk(user.subscription.plan_id);
        subscription = {
          ...user.subscription,
          features: subscriptionFeatures
        }
      }

      user.getRoles().then(roles => {

        res.status(200).send({
          id: user.id,
          email: user.email,
          roles: roles.map((role) => role.name),
          name: user.name,
          avatar: user.avatar,
          verified: user.verified,
          subscription: subscription,
          social: user.social
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}
export const getUsersList = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        email: {
          [Sequelize.Op.ne]: 'admin@lockleaks.com'
        }
      }
    });

    const responseData = [];

    for (let user of users) {

      await user.getRoles().then(roles => {

        responseData.push({
          id: user.id,
          email: user.email,
          roles: roles.map((role) => role.name),
          name: user.name,
          avatar: user.avatar,
          verified: user.verified,
          subscription: user.subscription,
          social: user.social
        });
      });
    }

    res.status(200).send(responseData);

  }
  catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }
}

export const updateUserInfo = async (req, res) => {

  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found!"
      });
    }

    const sameEmailUser = await User.findOne({
      where: {
        email
      }
    });

    if ( sameEmailUser ) {
      return res.status(403).send({
        message: "That email already existed!"
      });
    }

    let updateData = {
      email
    }

    if (password) {
      updateData.password = bcrypt.hashSync(password, 8)
    }

    await user.update({...updateData});

    res.status(200).send({
      message: `UserInfo updated ${user.id}`
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }

}

export const updateUserVisible = async (req, res) => {

  const { id } = req.params;
  const { ban } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found!"
      });
    }
    await user.update({
      ban
    });

    res.status(200).send({
      message: `User Visible updated ${user.id}`
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }

}

export const updateUserRole = async (req, res) => {

  const { id } = req.params;
  const { roles } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found!"
      });
    }

    await user.update({
      roles
    });

    res.status(200).send({
      message: `UserInfo updated ${user.id}`
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }

}


export const getExtraReport = async (req, res) => {

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  try {
    const weeklyUserCount = await User.count({
      where: {
        email: {
          [Sequelize.Op.not]: 'admin@lockleaks.com'
        },
        createdAt: {
          [Sequelize.Op.between]: [oneWeekAgo, new Date()]
        }
      }
    });

    const userCount = await User.count({
      where: {
        email: {
          [Sequelize.Op.not]: 'admin@lockleaks.com'
        }
      }
    });

    const weeklyOrderCount = await ScrapeSummary.count({
      where: {
        createdAt: {
          [Sequelize.Op.between]: [oneWeekAgo, new Date()]
        }
      }
    });

    const orderCount = await ScrapeSummary.count();

    res.status(200).send({
      user: {
        total: userCount,
        weekly: weeklyUserCount
      },
      order: {
        total: orderCount,
        weekly: weeklyOrderCount
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }


}

export const updatePaymentStatus = async (req, res) => {

  const { id } = req.params;
  const { payment_method, plan } = req.body;
  // trial , starter, pro, star

  try {
    const user = await User.findByPk(id);
    const subscriptionOption = await SubscriptionOptions.findOne({
      where: {
        option_name: plan
      }
    });

    let expire_date = new Date();
    if (plan == 'trial') expire_date.setDate(expire_date.getDate() + 3);
    else expire_date.setDate(expire_date.getDate() + 30);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found!"
      });
    }

    await user.update({
      subscription: {
        payment_method: payment_method,
        expire_date,
        plan_id: subscriptionOption.id,
        status: 'active' // 'active'| 'expired'
      }
    });

    res.status(200).send({
      message: `Payment was successed as ${plan}/${payment_method}`
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }

}

export const handleDeleteSubmition = async (req, res) => {
  const { name, email, capacityContent, legislationContent, specificContent } = req.body;

  try {

    const title = `Delete Submition | ${name}`;
    const content = `Full Name: ${name}\n
    Email used on lockleaks: ${email}\n
    Your capacity in making this request: ${capacityContent}\n
    Under which legislation are you making this request?: ${legislationContent}\n
    Do you have a specific request related to your personal data?: ${specificContent}
    `

    let emailContent = ElasticEmail.EmailMessageData.constructFromObject({
      Recipients: [new ElasticEmail.EmailRecipient(`support@lockleaks.com`)],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: content
          })
        ],
        Subject: title,
        From: elasticEmailConfig.auth.authEmail,
      }
    });

    var callback = function (error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully.');

        res.status(200).send({
          message: "Data Submitted Successfully!"
        })

      }
    };

    api.emailsPost(emailContent, callback);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const deleteUser = async (req, res) => {

  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found!"
      });
    }

    await user.destroy();

    res.status(200).send({
      message: `User deleted ${id}`
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }

}
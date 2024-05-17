import { Sequelize, where } from "sequelize";
import db from "../models/index.js";

const { user: User, scrapeSummary: ScrapeSummary } = db;

export const getUserInfo = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.getRoles().then(roles => {

        res.status(200).send({
          email: user.email,
          roles: roles.map((role) => role.name),
          name: user.name,
          avatar: user.avatar,
          verified: user.verified,
          subscription: user.subscription,
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
export const getUsersList = (req, res) => {

  const users = User.findAll({
    where: {
      email: {
        [Op.not]: 'admin@lockleaks.com'
      }
    }
  });

  const responseData = [];

  for (let user of users) {
    user.getRoles().then(roles => {

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

export const getExtraReport = async (req, res) => {

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  try {
    const weeklyUserCount = User.count({
      where: {
        email: {
          [Sequelize.Op.not]: 'admin@lockleaks.com'
        },
        createdAt: {
          [Sequelize.Op.between]: [oneWeekAgo, new Date()]
        }
      }
    });

    const userCount = User.count({
      where: {
        email: {
          [Sequelize.Op.not]: 'admin@lockleaks.com'
        }
      }
    });

    const weeklyOrderCount = ScrapeSummary.count({
      where: {
        createdAt: {
          [Op.between]: [oneWeekAgo, new Date()]
        }
      }
    });

    const orderCount = ScrapeSummary.count();

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
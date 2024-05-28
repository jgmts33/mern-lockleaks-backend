import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";
import path from 'path';

const { news: News, subscribedUsers: SubscribedUsers } = db;

let defaultClient = ElasticEmail.ApiClient.instance;

import ElasticEmail from '@elasticemail/elasticemail-client';
import elasticEmailConfig from '../config/elasticEmail.config..js';

let apikey = defaultClient.authentications['apikey'];
apikey.apiKey = "3D1F0FA1C5A6F371A302FE01088309D36EFFF8B9267447BEE543CEE904A4DD37ED7B42310822A28268C0278EF8D77F7C"

let api = new ElasticEmail.EmailsApi()

export const getNewsList = async (req, res) => {

  try {

    const newsList = await News.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).send(newsList);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getNews = async (req, res) => {

  const { id } = req.params;

  try {

    const news = await News.findByPk(id);

    res.status(200).send(news);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const createNews = async (req, res) => {

  const { title, content } = req.body;

  try {

    await News.create({
      title: title,
      content: content
    });

    res.status(200).send({
      message: "News created Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateNews = async (req, res) => {

  const { id } = req.params;
  const { title, content } = req.body;

  try {

    const news = await News.findByPk(id);

    await news.update({
      title,
      content
    });

    res.status(200).send({
      message: "News updated Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const deleteNews = async (req, res) => {

  const { id } = req.params;

  try {

    const news = await News.findByPk(id);
    news.destroy();

    res.status(200).send({
      message: "News deleted Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const sendNews = async (req, res) => {

  const { id } = req.params;

  try {

    const news = await News.findByPk(id);

    const emails = await SubscribedUsers.findAll({
      attributes: ['email']
    });

    let Recipients = [];

    for (const email of emails) {
      Recipients.push(new ElasticEmail.EmailRecipient(email))
    }

    let emailContent = ElasticEmail.EmailMessageData.constructFromObject({
      Recipients: Recipients,
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: news.content
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

        res.status(200).send({
          message: "News Sent Successfully!"
        })

      }
    };

    api.emailsPost(emailContent, callback);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const createNewSubsribeUser = async (req, res) => {
  const { email } = req.body;

  try {

    await SubscribedUsers.create({
      email
    })

    res.status(200).send({
      message: "New User joined to our News Subscribe Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
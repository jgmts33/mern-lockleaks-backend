import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";
import path from 'path';

const { customerReviews: CustomerReviews } = db;

export const getCustomerReViews = async (req, res) => {

  try {

    const reviews = await CustomerReviews.findAll();

    res.status(200).send(reviews);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getCustomerReview = async (req, res) => {

  const { id } = req.params;

  try {

    const review = await CustomerReviews.findByPk(id);

    res.status(200).send(review);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const createCustomerView = async (req, res) => {

  const { name, title, content, refer_link, discord, tiktok, telegram, twitter, facebook, reddit, instgram } = req.body;
  const avatar = req.files['avatar'];

  try {

    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[/,:]/g, '-').replace(/\s/g, '_');

    const avatarFilePath = path.join(`./uploads/${avatar.name.slice(0, -4)}_${currentDate}.png`);

    await avatar.mv(avatarFilePath);

    await CustomerReviews.create({
      name,
      avatar: `${avatar.name.slice(0, -4)}_${currentDate}.png`,
      title,
      content,
      refer_link,
      discord,
      tiktok,
      telegram,
      twitter,
      facebook,
      reddit,
      instgram
    });

    res.status(200).send({
      message: "Cusomter Review created Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateCustomerView = async (req, res) => {
  const { id } = req.params;
  const { name, title, content, refer_link, discord, tiktok, telegram, twitter, facebook, reddit, instgram } = req.body;
  const avatar = req.files ? req.files['avatar'] : null;

  try {

    const CustomerReview = await CustomerReviews.findByPk(id);

    let requestData = {
      name,
      title,
      content,
      refer_link,
      discord,
      tiktok,
      telegram,
      twitter,
      facebook,
      reddit,
      instgram
    }

    if (avatar) {
      const currentDate = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).replace(/[/,:]/g, '-').replace(/\s/g, '_');
      const avatarFilePath = path.join(`./uploads/${avatar.name.slice(0, -4)}_${currentDate}.png`);
      await avatar.mv(avatarFilePath);

      requestData.avatar = avatar;
    }
    await CustomerReview.update({
      ...updateCustomerView
    });

    res.status(200).send({
      message: "Cusomter Review updated Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const deleteCustomerReview = async (req, res) => {

  const { id } = req.params;

  try {

    const customerReview = await CustomerReviews.findByPk(id);

    await customerReview.destroy();

    res.status(200).send({
      message: "Customer Review deleted Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
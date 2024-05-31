import axios from "axios";
import db from "../models/index.js";

const { usernames: Usernames } = db;

export const getUsernames = async (req, res) => {
  const { id } = req.params;

  try {

    const usernamesList = await Usernames.findAll({
      where: {
        userId: id
      }
    });

    const responseData = [];
    for (let item of usernamesList) {
      responseData.push({
        username: item.username,
        link: item.link
      })
    }

    res.status(200).send(responseData);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const checkDoubleUsername = async (req, res) => {
  const { username, link } = req.body;

  try {

    const row = await Usernames.findOne({
      where: {
        username,
        link
      }
    });

    if (row) res.status(200).send({ valid: false });
    else res.status(200).send({ valid: true });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const createUserNames = async (req, res) => {
  const { id } = req.params;
  const { usernames } = req.body;

  try {

    for (let item of usernames) {
      const { username, link } = item;
      await Usernames.create({
        username,
        link: link,
        userId: id
      })
    }

    res.status(200).send({
      message: "User Names created Successfully"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
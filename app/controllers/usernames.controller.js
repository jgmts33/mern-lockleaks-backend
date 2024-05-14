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

    res.status(200).send({
      ...usernamesList
    });

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

    usernames.map(async (item) => {
      await Usernames.create({
        username: item.username,
        link: item, link,
        userId: id
      })
    })

    res.status(200).send({
      message: "User Names created Successfully"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
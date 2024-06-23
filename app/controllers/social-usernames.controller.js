import axios from "axios";
import db from "../models/index.js";

const { socialUsernames: SocialUsernames } = db;

export const getSocialUsername = async (req, res) => {
  const { id } = req.params;

  try {

    const socialUsername = await SocialUsernames.findOne({
      where: {
        userId: id
      }
    });

    res.status(200).send(socialUsername);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const createNewSocialUsername = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {

    const row = await SocialUsernames.create({
      username,
      userId: id
    });

    res.status(200).send(row);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateSocialUsername = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const row = await SocialUsernames.findByPk(id);

    if (!row) {
      return res.status(404).send({
        message: "Social Username is not found"
      })
    }

    await row.update({
      username
    });

    res.status(200).send(row);

  } catch (err) {
    res.status(500).send({
      message: err.message
    })
  }
}

export const deleteSocialUsername = async (req, res) => {
  const { id } = req.params;

  try {
    const row = await SocialUsernames.findByPk(id);

    if (!row) {
      res.status(404).send({
        message: "Social Username is not found"
      })
    }

    await row.destroy();

    res.status(200).send({
      message: "Deleted Social Username successfully!"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message
    })
  }
}
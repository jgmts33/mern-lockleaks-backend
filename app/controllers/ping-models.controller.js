import { Sequelize } from "sequelize";
import db from "../models/index.js";

const { pingModels: PingModels } = db;

export const addNewPingModel = async (req, res) => {
  const {
    model_name,
    platform,
    social_media
  } = req.body;

  try {
    const newRow = await PingModels.create({
      model_name,
      platform,
      social_media
    });

    res.status(200).send(newRow);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updatePingModel = async (req, res) => {
  const { id } = req.params;
  const {
    model_name,
    platform,
    social_media,
    response,
    goal
  } = req.body;

  try {

    const pingModel = await PingModels.findByPk(id);

    await pingModel.update({
      model_name,
      platform,
      social_media,
      response,
      goal
    });

    res.status(200).send({
      message: "Ping Model Updated Successfully!"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const deletePingModel = async (req, res) => {
  const { id } = req.params;

  try {

    const pingModel = await PingModels.findByPk(id);

    await pingModel.destroy();

    res.status(200).send({
      message: "Ping Model deleted Successfully!"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getPingModels = async (req, res) => {
  const { page, search } = req.query;

  const searchPattern = '%' + search + '%';

  try {
    let whereCondition = {};

    if (search) {
      // Directly embed the search term into the SQL string
      whereCondition = Sequelize.literal(`
      SELECT *
      FROM ping_models
      WHERE (
        model_name @> ARRAY[${searchPattern}] OR
        platform @> ARRAY[${searchPattern}] OR
        social_media @> ARRAY[${searchPattern}]
      )
    `);
    }

    const { count: totalCount, rows: pingModels } = await PingModels.findAndCountAll({
      where: whereCondition,
      limit: 6,
      offset: (page - 1) * 6
    });

    res.status(200).send({
      data: pingModels,
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / 6)
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
}

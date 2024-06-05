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
  const pageSize = 6; // Define your page size

  try {
    // Construct a condition to fetch rows based on a broader criterion
    const whereCondition = {
      [Sequelize.Op.or]: [
        { model_name: { [Sequelize.Op.like]: `%${search}%` } },
        { platform: { [Sequelize.Op.like]: `%${search}%` } },
        { social_media: { [Sequelize.Op.like]: `%${search}%` } }
      ]
    };

    // Fetch all rows based on the condition
    const rows = await PingModels.findAll({ where: whereCondition });

    // Calculate the total number of pages
    const totalCount = rows.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    // Apply pagination
    const paginatedRows = rows.slice((page - 1) * pageSize, page * pageSize);

    // Filter rows in JavaScript to match the criteria
    const filteredRows = paginatedRows.filter(row => {
      return row.model_name.some(item => item.includes(search)) ||
             row.platform.some(item => item.includes(search)) ||
             row.social_media.some(item => item.includes(search));
    });

    res.status(200).json({
      data: filteredRows,
      totalCount: totalCount,
      totalPages: totalPages
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
}

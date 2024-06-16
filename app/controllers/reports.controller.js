import { Sequelize } from "sequelize";
import db from "../models/index.js";

const { reports: Reports } = db;

export const addNewReport = async (req, res) => {
  const {
    website,
    method,
    links
  } = req.body;

  try {
    const newRow = await Reports.create({
      website,
      method,
      links
    });

    res.status(200).send(newRow);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateReport = async (req, res) => {
  const { id } = req.params;
  const {
    website,
    method,
    links,
    success
  } = req.body;

  try {

    const row = await Reports.findByPk(id);

    await row.update({
      website,
      method,
      links,
      success
    });

    res.status(200).send({
      message: "Report Updated Successfully!"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {

    const row = await Reports.findByPk(id);

    await row.destroy();

    res.status(200).send({
      message: "Report deleted Successfully!"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getReports = async (req, res) => {

  const { page, search } = req.query;

  try {

    let whereCondition = {};
    if (search) {
      whereCondition = {
        [Sequelize.Op.or]: [
          {
            website: {
              [Sequelize.Op.like]: '%' + search + '%'
            }
          },
          {
            method: {
              [Sequelize.Op.like]: '%' + search + '%'
            }
          },
          {
            links: {
              [Sequelize.Op.overlap]: [search]
            }
          }
        ]
      }
    }

    const { count: totalCount, rows: reports } = await Reports.findAndCountAll({
      where: whereCondition,
      limit: 6,
      offset: (page - 1) * 6
    });

    res.status(200).send({
      data: reports,
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

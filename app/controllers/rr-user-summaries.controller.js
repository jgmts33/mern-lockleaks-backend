import axios from "axios";
import db from "../models/index.js";
import { io } from "../../server.js";
import path from 'path';
import fs from 'fs';
import FormData from "form-data";
import { Sequelize } from "sequelize";

const { rrUserSummaries: RRUserSummaries, user: User, notifications: Notifications, role: Role } = db;

export const scan = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {

    const user = await User.findByPk(id);

    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[/,:]/g, '.').replace(/\s/g, '.');

    let data = new FormData();
    data.append('out', `rr_user_${currentDate}_${user.name.replaceAll(" ", "_").toLowerCase()}`);
    data.append('name', username);
    data.append('email', user.email);
    data.append('username', user.name);

    console.log('data:', data);

    const scanRes = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/rr/username`, data, {
      headers: {
        ...data.getHeaders()
      }
    });

    console.log("scanRes:", scanRes);

    const result = await RRUserSummaries.create({
      file: `rr_user_${currentDate}_${user.name.replaceAll(" ", "_").toLowerCase()}`,
      result: scanRes.data.total_results,
      user_id: id
    });

    io.emit(`rr-user-scan-finished`, result);

    const row = await Notifications.create({
      content: 'R&R User Scan finished!',
      user_id: id
    });

    io.emit(`notification_${id}`, row)

    const moderatorsOrAdmins = await User.findAll({
      include: [{
        model: Role,
        as: 'roles',
        where: {
          [Sequelize.Op.or]: [
            {
              name: 'admin'
            },
            {
              name: 'moderator'
            }
          ]
        }
      }]
    })

    for (let each of moderatorsOrAdmins) {
      const newRow = await Notifications.create({
        content: 'New Order R&R',
        user_id: each.id
      });
      io.emit(`notification_${each.id}`, newRow)
    }

    res.status(200).send(result);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const downloadRRUserResult = async (req, res) => {

  const { file } = req.query;

  try {
    const scannedData = await RRUserSummaries.findOne({
      where: {
        file
      }
    });

    if (scannedData) {
      const response = await axios.post(`${process.env.BOT_API_ENDPOINT}/download`, {
        folder_name: file
      }, {
        responseType: "stream"
      });

      scannedData.update({
        downloaded: true
      })

      response.data.pipe(res);
    }
    else {
      res.status(404).send({
        message: "R&R User Scanned Data not Found!"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getRRUserResultByUser = async (req, res) => {

  const { id } = req.params;

  try {
    const scannedData = await RRUserSummaries.findAll({
      where: {
        user_id: id
      },
      order: [['createdAt', 'DESC']]
    });

    let totalResult = 0;

    for (let eachData of scannedData) {
      totalResult += eachData.result;
    }

    res.status(200).send({
      totalResult,
      lastResult: scannedData[0]?.result || 0
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getRRUserResult = async (req, res) => {

  try {
    const scannedData = await RRUserSummaries.findAll({
      order: [['createdAt', 'DESC']]
    });

    let totalResult = 0;

    for (let eachData of scannedData) {
      totalResult += eachData.result;
    }

    res.status(200).send({
      totalResult,
      lastResult: scannedData[0]?.result || 0
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getRRUserResultsList = async (req, res) => {

  try {

    const scannedData = await RRUserSummaries.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).send(scannedData);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
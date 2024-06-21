import axios from "axios";
import db from "../models/index.js";
import { io } from "../../server.js";
import path from 'path';
import fs from 'fs';
import FormData from "form-data";
import { Sequelize } from "sequelize";

const { rrPhotoSummaries: RRPhotoSummaries, user: User, notifications: Notifications, role: Role } = db;

export const scan = async (req, res) => {
  const { id } = req.params;

  try {

    const user = await User.findByPk(id);

    const photo = req.files['photo'];

    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[/,:]/g, '.').replace(/\s/g, '.');

    const photoFilePath = path.join(`./uploads/${currentDate}_rr_photo.png`);

    await photo.mv(photoFilePath);

    let data = new FormData();
    data.append('out', `rr_photo_${currentDate}_${user.name.replaceAll(" ", "_").toLowerCase()}`);
    data.append('photo', fs.createReadStream(photoFilePath));
    data.append('email', user.email);
    data.append('username', user.name);

    console.log('data:', data);

    const scanRes = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/rr/photo`, data, {
      headers: {
        ...data.getHeaders()
      }
    });

    console.log("scanRes:", scanRes);

    const result = await RRPhotoSummaries.create({
      file: `rr_photo_${currentDate}_${user.name.replaceAll(" ", "_").toLowerCase()}`,
      result: scanRes.data.total_results,
      user_id: id
    });

    io.emit(`rr-photo-scan-finished`, result);

    const row = await Notifications.create({
      content: 'R&R Photo Scan finished!',
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

export const downloadRRPhotoResult = async (req, res) => {

  const { file } = req.query;

  try {
    const scannedData = await RRPhotoSummaries.findOne({
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
        message: "R&R Photo Scanned Data not Found!"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getRRPhotoResultByUser = async (req, res) => {

  const { id } = req.params;

  try {
    const scannedData = await RRPhotoSummaries.findAll({
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

export const getRRPhotoResult = async (req, res) => {

  try {
    const scannedData = await RRPhotoSummaries.findAll({
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

export const getRRPhotoResultsList = async (req, res) => {

  try {

    const scannedData = await RRPhotoSummaries.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).send(scannedData);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
import axios from "axios";
import db from "../models/index.js";
import { io } from "../../server.js";
import path from 'path';
import fs from 'fs';
import FormData from "form-data";
import { Sequelize } from "sequelize";

const { aiBotsSummaries: AIBotsSummaries, user: User, notifications: Notifications, role: Role } = db;

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

    const photoFilePath = path.join(`./uploads/${currentDate}_ai_face_photo.png`);

    await photo.mv(photoFilePath);

    let data = new FormData();
    data.append('out', `ai_face_${currentDate}_${user.name.replaceAll(" ", "_").toLowerCase()}`);
    data.append('photo', fs.createReadStream(photoFilePath));
    data.append('email', user.email);
    data.append('username', user.name);

    console.log('data:', data);

    const scanRes = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/ai-face`, data, {
      headers: {
        ...data.getHeaders()
      }
    });

    console.log("scanRes:", scanRes);

    const result = await AIBotsSummaries.create({
      file: `ai_face_${currentDate}_${user.name.replaceAll(" ", "_").toLowerCase()}`,
      result: scanRes.data.total_results,
      user_id: id
    });

    io.emit(`ai-face-scan-finished`, result);

    const row = await Notifications.create({
      content: 'AI Face Scan finished!',
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
        content: 'New Order AI FACE',
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

export const downloadAIFaceResult = async (req, res) => {

  const { file } = req.query;

  try {
    const scannedData = await AIBotsSummaries.findOne({
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
        message: "AI Face Scanned Data not Found!"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getAIFaceResultByUser = async (req, res) => {

  const { id } = req.params;

  try {
    const scannedData = await AIBotsSummaries.findAll({
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

export const getAIFaceResult = async (req, res) => {

  try {
    const scannedData = await AIBotsSummaries.findAll({
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

export const getAIFaceResultsList = async (req, res) => {

  try {

    const scannedData = await AIBotsSummaries.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).send(scannedData);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
import axios from "axios";
import db from "../models/index.js";
import { io } from "../../server.js";

const { aiBotsSummaries: AIBotsSummaries } = db;

export const scan = async (req, res) => {
  const { id } = req.params;

  try {

    console.log(req.files['photo'])

    const file = req.files['photo'];

    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[/,:]/g, '-').replace(/\s/g, '_');

    let data = new FormData();

    data.append('photo', file);
    data.append('out', `${currentDate}_ai_face_${id}`);

    console.log('data:', data);

    const scanRes = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/ai-face`, {
      photo: file,
      out:  `${currentDate}_ai_face_${id}`
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log("scanRes:", scanRes);

    const result = await AIBotsSummaries.create({
      file: `${currentDate}_ai_face_${id}`,
      result: scanRes.data.total_results,
      user_id: id
    });

    io.emit(`ai-face-scan-finished`, scanRes.data.total_results);

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
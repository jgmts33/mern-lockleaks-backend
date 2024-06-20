import axios from "axios";
import db from "../models/index.js";
import { extractDomain } from "../utils/index.js";
import { io } from "../../server.js";

const { socialSummaries: SocialSummaries, user: User } = db;

export const scan = async (req, res) => {
  const { username } = req.body;
  const { id } = req.params;

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

    let requestData = {
      keywords: username,
      limit: 1,
      out: `sm_scanner_${currentDate}_${user.name.replaceAll(" ", "_").toLowerCase()}`,
      email: user.email,
      username: user.name
    }

    const scanRes = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/social`, requestData);

    const result = await SocialSummaries.create({
      file: `sm_scanner_${currentDate}_${user.name.replaceAll(" ", "_").toLowerCase()}`,
      result: scanRes.data.total_results,
      user_id: id
    });

    io.emit(`social-scan-finished`, scanRes.data.total_results);

    io.emit(`admin:socialScanFinished`, result);

    res.status(200).send(result);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const downloadSocialResult = async (req, res) => {

  const { file } = req.query;

  try {
    const scannedData = await SocialSummaries.findOne({
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
        message: "Social Scanned Data not Found!"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getSocialResultByUser = async (req, res) => {

  const { id } = req.params;

  try {
    const scannedData = await SocialSummaries.findAll({
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

export const getSocialResult = async (req, res) => {

  try {
    const scannedData = await SocialSummaries.findAll({
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

export const getSocialResultsList = async (req, res) => {

  try {

    const scannedData = await SocialSummaries.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).send(scannedData);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
import axios from "axios";
import db from "../models/index.js";
import { extractDomain } from "../utils/index.js";
import { io } from "../../server.js";
import { Sequelize } from "sequelize";

const { socialSummaries: SocialSummaries, socialMediaProfiles: SocialMediaProfiles, user: User, notifications: Notifications, role: Role } = db;

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

    const newASocialSummary = await SocialSummaries.create({
      file: `sm_scanner_${currentDate}_${user.name.replaceAll(" ", "_").toLowerCase()}`,
      result: 0,
      progress: 0.9,
      user_id: id
    });

    const scanRes = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/social`, requestData);

    const result = await newASocialSummary.update({
      result: scanRes.data.total_results,
      progress: 0
    });

    io.emit(`social-scan-finished`, result);

    const row = await Notifications.create({
      content: 'Social Media Scan finished!',
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
        content: 'New Order Social Media',
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

export const downloadSocialResult = async (req, res) => {

  const { file } = req.query;

  try {
    const scannedData = await SocialSummaries.findOne({
      where: {
        file,
        progress: 0
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
        user_id: id,
        progress: 0
      },
      order: [['createdAt', 'DESC']]
    });
    const profilesData = await SocialMediaProfiles.findAll({
      where: {
        user_id: id
      },
      order: [['createdAt', 'DESC']]
    });

    let totalResult = 0, lastResult = 0;

    for (let eachData of scannedData) {
      totalResult += eachData.result;
    }

    for (let eachData of profilesData) {
      totalResult += eachData.count;
    }

    if (scannedData[0].createdAt > profilesData[0].createdAt) {
      lastResult = scannedData[0].result
    } else {
      lastResult = profilesData[0].count
    }

    res.status(200).send({
      totalResult,
      lastResult: lastResult
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
      where: {
        progress: 0
      },
      order: [['createdAt', 'DESC']]
    });
    const profilesData = await SocialMediaProfiles.findAll({
      order: [['createdAt', 'DESC']]
    });

    let totalResult = 0, lastResult = 0;

    for (let eachData of scannedData) {
      totalResult += eachData.result;
    }

    for (let eachData of profilesData) {
      totalResult += eachData.count;
    }

    if (scannedData[0].createdAt > profilesData[0].createdAt) {
      lastResult = scannedData[0].result
    } else {
      lastResult = profilesData[0].count
    }

    res.status(200).send({
      totalResult,
      lastResult: lastResult
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
      where: {
        progress: 0
      },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).send(scannedData);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getCurrentSocialScannerStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const currentDate = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Calculate the sum of counts for records created today
    const count = await SocialSummaries.count({
      where: {
        user_id: id,
        createdAt: {
          [Sequelize.Op.gte]: `${currentDate}T00:00:00Z`, // Start of the day
          [Sequelize.Op.lt]: `${currentDate}T23:59:59Z`, // End of the day
        },
      },
    });

    const inProgress = await SocialSummaries.findOne({
      where: {
        user_id: id,
        progress: {
          [Sequelize.Op.ne]: 0
        }
      },
      order: [['createdAt', 'DESC']]
    })

    res.status(200).json({
      count,
      inProgress
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while calculating the total count.' });
  }

}
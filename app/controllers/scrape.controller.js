import axios from "axios";
import db from "../models/index.js";
import { extractDomain } from "../utils/index.js";
import { io } from "../../server.js";
import { Sequelize, where } from "sequelize";

const { scrapeSummary: ScrapeSummary, customKeywords: CustomKeywords, basicKeywords: BasicKeywords, user: User, notifications: Notifications, role: Role } = db;

export const scrapeData = async (req, res) => {
  const { usernames, only } = req.body;
  const { id } = req.params;

  try {

    const user = await User.findByPk(id);

    let queries = [], data = {
      scrate_date: "",
      total_google_links: 0,
      total_google_images: 0,
      total_google_videos: 0,
      total_bing_links: 0,
      total_bing_images: 0,
      total_bing_videos: 0,
      good_count: 0,
      other_count: 0,
      bad_count: 0,
      new_count: 0,
      report_count: 0,
      no_report_count: 0,
      matches_count: 0,
      no_matches_count: 0,
      user_id: id,
    };

    for (const eachData of usernames) {
      const customKeyword = await CustomKeywords.findOne({
        where: {
          website: extractDomain(eachData.link)
        }
      });

      let array_keywords = [];
      if (customKeyword) {
        array_keywords = customKeyword.keywords.split(",");
        console.log("array_keywords", array_keywords);
        for (const item of array_keywords) {
          queries.push(`${eachData.username} ${item}`);
        }
      } else {
        array_keywords = await BasicKeywords.findAll();
        for (const item of array_keywords) {
          queries.push(`${eachData.username} ${item.keyword}`);
        }
      }
    }
    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[/,:]/g, '.').replace(/\s/g, '.');

    let requestData = {
      query: "",
      currentDate: `scanner_${currentDate}_${user.name.replaceAll(" ", "_").toLowerCase()}`,
      no_google: false,
      no_bing: false,
      save_results: true,
      max_pages: 2
    }

    if (only == 'google') requestData.no_bing = true;
    if (only == 'bing') requestData.no_google = true;
    let index = 0;

    const newScapreSummary = await ScrapeSummary.create({
      scrape_date: `scanner_${currentDate}_${user.name.replaceAll(" ", "_").toLowerCase()}`,
      user_id: id,
      progress: 0.01 / 100
    });


    for (const query of queries) {
      requestData.query = query;
      index++;
      console.log("query:", query, " userindex:", id, " index:", index);
      const scrapeRes = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/scrape`, {
        ...requestData
      });

      if (only == 'google') {
        io.emit(`${id}:scrape-google`, {
          current: index,
          all: queries.length
        });
      } else if (only == 'bing') {
        io.emit(`${id}:scrape-bing`, {
          current: index,
          all: queries.length
        });
      } else {
        io.emit(`${id}:scrape`, {
          current: index,
          all: queries.length
        });
      }

      await newScapreSummary.update({
        total_google_links: newScapreSummary.total_google_links + scrapeRes.data.google_link_count,
        total_google_images: newScapreSummary.total_google_images + scrapeRes.data.google_image_count,
        total_google_videos: newScapreSummary.total_google_videos + scrapeRes.data.google_video_count,
        total_bing_links: newScapreSummary.total_bing_links + scrapeRes.data.bing_link_count,
        total_bing_images: newScapreSummary.total_bing_images + scrapeRes.data.bing_image_count,
        total_bing_videos: newScapreSummary.total_bing_videos + scrapeRes.data.bing_video_count,
        good_count: newScapreSummary.good_count + scrapeRes.data.good_count,
        other_count: newScapreSummary.other_count + scrapeRes.data.other_count,
        bad_count: newScapreSummary.bad_count + scrapeRes.data.bad_count,
        new_count: newScapreSummary.new_count + scrapeRes.data.new_count,
        report_count: newScapreSummary.report_count + scrapeRes.data.report_count,
        no_report_count: newScapreSummary.no_report_count + scrapeRes.data.no_report_count,
        matches_count: newScapreSummary.matches_count + scrapeRes.data.matches_count,
        no_matches_count: newScapreSummary.no_matches_count + scrapeRes.data.no_matches_count,
        progress: index / queries.length
      })

      // only_google: requestData.no_bing,
      //   only_bing: requestData.no_google,

    }

    await axios.post(`${process.env.BOT_API_ENDPOINT}/zip`, {
      folder_name: `scanner_${currentDate}_${user.name.replaceAll(" ", "_").toLowerCase()}`,
      email: user.email,
      username: user.name
    });

    await newScapreSummary.update({
      only_google: requestData.no_bing,
      only_bing: requestData.no_google,
      status: "available",
      progress: 0,
    });

    const row = await Notifications.create({
      content: 'Search Engines Scan finished!',
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
        content: only ? 'New Order Google & Bing' : 'New Order Scanner',
        user_id: each.id
      });
      io.emit(`notification_${each.id}`, newRow)
    }

    if (only == 'google') {
      io.emit(`scanner-finished`, 'google');
      io.emit(`scanner-finished-${id}`, 'google');
    } else if (only == 'bing') {
      io.emit(`scanner-finished`, 'bing');
      io.emit(`scanner-finished-${id}`, 'bing');
    } else {
      io.emit(`scanner-finished`, '');
      io.emit(`scanner-finished-${id}`, '');
    }

    res.status(200).send({
      message: "Scraped Successfully!"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const downloadSrapedData = async (req, res) => {

  const { id } = req.params;
  const { folder_name, admin } = req.query;
  try {
    const scrapedData = await ScrapeSummary.findOne({
      where: {
        user_id: id,
        scrape_date: folder_name,
        progress: 0
      }
    });

    if (scrapedData) {
      const response = await axios.post(`${process.env.BOT_API_ENDPOINT}/download`, {
        folder_name: folder_name
      }, {
        responseType: "stream"
      });

      console.log("response.data:", response.data);
      if (admin) scrapedData.update({
        accepted: true
      })

      else scrapedData.update({
        downloaded: true
      })

      response.data.pipe(res);
    }
    else {
      res.status(404).send({
        message: "Scraped Data not Found!"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const acceptOrder = async (req, res) => {

  const { folder_name } = req.query;

  try {
    const scrapedData = await ScrapeSummary.findOne({
      where: {
        scrape_date: folder_name,
        progress: 0
      }
    });

    if (scrapedData) {
      const response = await axios.post(`${process.env.BOT_API_ENDPOINT}/download`, {
        folder_name: folder_name
      }, {
        responseType: "stream"
      });

      scrapedData.update({
        accepted: true
      })

      response.data.pipe(res);
    }
    else {
      res.status(404).send({
        message: "Scraped Data not Found!"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getScrapedDataListByUser = async (req, res) => {

  const { only, lastOne } = req.query;
  const { id } = req.params;

  try {
    let findCondition = {
      where: {
        user_id: id,
        progress: 0
      },
      order: [['createdAt', 'DESC']]
    };

    if (lastOne) findCondition.limit = 1;

    if (only == 'google') findCondition.where.only_google = true;
    else if (only == 'bing') findCondition.where.only_bing = true;
    else {
      findCondition.where.only_google = false;
      findCondition.where.only_bing = false;
    }

    const scrapedData = await ScrapeSummary.findAll(findCondition);

    res.status(200).send(scrapedData);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getScrapedDataList = async (req, res) => {

  const { only } = req.query;

  try {
    let scrapedData;

    switch (only) {
      case 'google':
        scrapedData = await ScrapeSummary.findAll({
          where: {
            only_google: true,
            progress: 0
          },
          order: [['createdAt', 'DESC']]
        });
        break;
      case 'bing':
        scrapedData = await ScrapeSummary.findAll({
          where: {
            only_bing: true,
            progress: 0
          },
          order: [['createdAt', 'DESC']]
        });
        break;
      default:
        scrapedData = await ScrapeSummary.findAll({
          where: {
            progress: 0
          },
          order: [['createdAt', 'DESC']]
        });
        break;
    }

    res.status(200).send(scrapedData);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getCurrentScannerStatus = async (req, res) => {
  const { id } = req.params;
  const { only } = req.query;

  try {
    const currentDate = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    let whereCondition = {
      user_id: id,
      createdAt: {
        [Sequelize.Op.gte]: `${currentDate}T00:00:00Z`, // Start of the day
        [Sequelize.Op.lt]: `${currentDate}T23:59:59Z`, // End of the day
      },
    };

    if (only == 'google') whereCondition.only_google = true;
    if (only == 'bing') whereCondition.only_bing = true;

    // Calculate the sum of counts for records created today
    const count = await ScrapeSummary.count({
      where: whereCondition
    });

    let inProgressCondition = {
      user_id: id,
      progress: {
        [Sequelize.Op.ne]: 0
      }
    }

    if (only == 'google') inProgressCondition.only_google = true;
    if (only == 'bing') inProgressCondition.only_bing = true;

    const inProgress = await ScrapeSummary.findOne({
      where: inProgressCondition,
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
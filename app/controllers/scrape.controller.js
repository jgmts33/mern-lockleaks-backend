import axios from "axios";
import db from "../models/index.js";
import { extractDomain } from "../utils/index.js";
import { io } from "../../server.js";

const { scrapeSummary: ScrapeSummary, customKeywords: CustomKeywords, basicKeywords: BasicKeywords } = db;

export const scrapeData = async (req, res) => {
  const { query, currentDate, only } = req.body;

  try {

    let requestData = {
      query,
      currentDate,
      no_google: false,
      no_bing: false,
      save_results: true
    }

    if (only == 'google') requestData.no_bing = true;
    if (only == 'bing') requestData.no_google = true;

    const res = await axios.post(`${process.env.BOT_API_ENDPOINT}/scrape`, {
      ...requestData
    });

    res.status(200).send(res.data);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const saveScrapedData = async (req, res) => {

  const { id } = req.params;
  const { data } = req.body;

  await axios.post(`${process.env.BOT_API_ENDPOINT}/zip`, {
    folder_name: data.scrape_date
  });

  await ScrapeSummary.create({ ...data, user_id: id });

  io.emit(`admin:dashboardInfo`, 'scan-finished');
  
  res.status(200).send({
    message: "Sraped Data saved Successfully!"
  });

}

export const downloadSrapedData = async (req, res) => {

  const { id } = req.params;
  const { folder_name, admin } = req.query;

  const scrapedData = await ScrapeSummary.findOne({
    where: {
      user_id: id,
      scrape_date: folder_name
    }
  });

  if (scrapedData) {
    const response = await axios.post(`${process.env.BOT_API_ENDPOINT}/download`, {
      folder_name: folder_name
    }, {
      responseType: "stream"
    });
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
}

export const acceptOrder = async (req, res) => {

  const { folder_name } = req.query;

  const scrapedData = await ScrapeSummary.findOne({
    where: {
      scrape_date: folder_name
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
}

export const getScrapedDataListByUser = async (req, res) => {

  const { only, lastOne } = req.query;
  const { id } = req.params;

  let findCondition = {
    where: {
      user_id: id
    },
    order: [['createdAt', 'DESC']]
  };

  if (lastOne) findCondition.limit = 1;

  if (only == 'google') findCondition.where.only_google = true;
  if (only == 'bing') findCondition.where.only_bing = true;

  const scrapedData = await ScrapeSummary.findAll(findCondition);

  res.status(200).send(scrapedData);
}

export const getScrapedDataList = async (req, res) => {

  const { only } = req.query;

  let scrapedData;

  switch (only) {
    case 'google':
      scrapedData = await ScrapeSummary.findAll({
        where: {
          only_google: true
        },
        order: [['createdAt', 'DESC']]
      });
      break;
    case 'bing':
      scrapedData = await ScrapeSummary.findAll({
        where: {
          only_bing: true
        },
        order: [['createdAt', 'DESC']]
      });
      break;
    default:
      scrapedData = await ScrapeSummary.findAll({
        order: [['createdAt', 'DESC']]
      });
      break;
  }

  res.status(200).send(scrapedData);
}
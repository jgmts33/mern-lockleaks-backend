import axios from "axios";
import db from "../models/index.js";
import { extractDomain } from "../utils/index.js";
import { io } from "../../server.js";

const { scrapeSummary: ScrapeSummary, customKeywords: CustomKeywords, basicKeywords: BasicKeywords } = db;

export const scrapeData = async (req, res) => {
  const { usernames, only } = req.body;
  const { id } = req.params;

  try {

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
    }).replace(/[/,:]/g, '-').replace(/\s/g, '_');

    let requestData = {
      query: "",
      currentDate,
      no_google: false,
      no_bing: false,
      save_results: true,
      max_pages: 2
    }

    if (only == 'google') requestData.no_bing = true;
    if (only == 'bing') requestData.no_google = true;
    let index = 0 ;
    for (const query of queries) {
      requestData.query = query;
      index++;
      console.log("query:", query, " userindex:", id, " index:", index);
      const res = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/scrape`, {
        ...requestData
      });

      io.emit(`${id}:scrape`, {
        current: index,
        all: queries.length
      });

      data = {
        scrape_date: currentDate,
        total_google_links: data.total_google_links + res.data.google_link_count,
        total_google_images: data.total_google_images + res.data.google_image_count,
        total_google_videos: data.total_google_videos + res.data.google_video_count,
        total_bing_links: data.total_bing_links + res.data.bing_link_count,
        total_bing_images: data.total_bing_images + res.data.bing_image_count,
        total_bing_videos: data.total_bing_videos + res.data.bing_video_count,
        good_count: data.good_count + res.data.good_count,
        other_count: data.other_count + res.data.other_count,
        bad_count: data.bad_count + res.data.bad_count,
        new_count: data.new_count + res.data.new_count,
        report_count: data.report_count + res.data.report_count,
        no_report_count: data.no_report_count + res.data.no_report_count,
        matches_count: data.matches_count + res.data.matches_count,
        no_matches_count: data.no_matches_count + res.data.no_matches_count,
        status: "available",
        downloaded: false,
        only_google: requestData.no_bing,
        only_bing: requestData.no_google,
        accepted: false,
        user_id: id
      }
    }

    await axios.post(`${process.env.BOT_API_ENDPOINT}/zip`, {
      folder_name: currentDate
    });

    await ScrapeSummary.create({ ...data });

    io.emit(`admin:dashboardInfo`, 'scan-finished');

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
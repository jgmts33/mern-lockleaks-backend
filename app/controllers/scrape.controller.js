import axios from "axios";
import db from "../models/index.js";
import { extractDomain } from "../utils/index.js";
import { io } from "../../server.js";

const { scrapeSummary: ScrapeSummary, customKeywords: CustomKeywords, basicKeywords: BasicKeywords } = db;

export const scrapeData = async (req, res) => {
  const { usernames } = req.body;
  const { id } = req.params;

  try {

    let fullQuery = "", data = {
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
          fullQuery += `${eachData.username} ${item}, `;
        }
      } else {
        array_keywords = await BasicKeywords.findAll();
        for (const item of array_keywords) {
          fullQuery += `${eachData.username} ${item.keyword}, `;
        }
      }
    }
    fullQuery = fullQuery.slice(0, -2);
    const queries = fullQuery.replaceAll(",", " ").split("  ");
    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[/,:]/g, '-').replace(/\s/g, '_');

    let scrapeProgress = 0;

    for (const query of queries) {
      const res = await axios.post(`${process.env.BOT_API_ENDPOINT}/scrape`, {
        query,
        currentDate,
        save_results: true
      });

      scrapeProgress += (100 / queries.length);
      io.emit(`${id}:scrape`, scrapeProgress);

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
        user_id: id
      }
    }

    await axios.post(`${process.env.BOT_API_ENDPOINT}/zip`, {
      folder_name: currentDate
    });

    const scrapeSummary = await ScrapeSummary.create({ ...data });

    res.status(200).send({
      total_google_links: scrapeSummary.total_google_links,
      total_google_images: scrapeSummary.total_google_images,
      total_google_videos: scrapeSummary.total_google_videos,
      total_bing_links: scrapeSummary.total_bing_links,
      total_bing_images: scrapeSummary.total_bing_images,
      total_bing_videos: scrapeSummary.total_bing_videos,
      good_count: scrapeSummary.good_count,
      other_count: scrapeSummary.other_count,
      bad_count: scrapeSummary.bad_count,
      new_count: scrapeSummary.new_count,
      report_count: scrapeSummary.report_count,
      no_report_count: scrapeSummary.no_report_count,
      matches_count: scrapeSummary.matches_count,
      no_matches_count: scrapeSummary.no_matches_count,
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const downloadSrapedData = async (req, res) => {

  const { id } = req.params;
  const { folder_name } = req.query;

  const scrapedData = await ScrapeSummary.findOne({
    where: {
      user_id: id,
      scrape_date: folder_name
    }
  });

  console.log(scrapedData);

  if (scrapedData) {
    const response = await axios.post(`${process.env.BOT_API_ENDPOINT}/download`, {
      folder_name: folder_name
    }, {
      responseType: "stream"
    });

    res.status(200).send(response);
  }
  else {
    res.status(404).send({
      message: "Scraped Data not Found!"
    });
  }
}

export const getScrapedDataList = async (req, res) => {

  const { id } = req.params;

  const scrapedData = await ScrapeSummary.findAll({
    where: {
      user_id: id
    },
    order: [['createdAt', 'DESC']],
    attributes: ['scrape_date']
  });

  res.status(200).send(scrapedData);
}
import axios from "axios";
import db from "../models/index.js";
import { extractDomain } from "../utils/index.js";

const { scrapeSummary: ScrapeSummary, customKeywords: CustomKeywords, basicKeywords: BasicKeywords } = db;

export const scrapeData = async (req, res) => {
  const { usernames } = req.body;
  const { id } = req.params;

  console.log("usernames:", usernames);
  console.log("id:", id);

  try {

    let fullQuery = "", data = {
      currentDate: "",
      google_link_count: 0,
      google_image_count: 0,
      google_video_count: 0,
      bing_link_count: 0,
      bing_image_count: 0,
      bing_video_count: 0,
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

    usernames.map(async ({ username, link }) => {
      const customKeyword = await CustomKeywords.findOne({
        where: {
          website: extractDomain(link)
        }
      });

      if (customKeyword) {
        let array_keywords = customKeyword.keywords.split(",");
        array_keywords.map((item) => fullQuery += `${username} ${item},`);
        fullQuery = fullQuery.slice(0, -1);
      }
      else {
        const array_keywords = await BasicKeywords.findAll();
        array_keywords.map((item) => fullQuery += `${username} ${item.keyword},`);
        fullQuery = fullQuery.slice(0, -1);
      }
    })


    const queries = fullQuery.replace(",", " ").split("  ");
    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[/,:]/g, '-').replace(/\s/g, '_');

    console.log(queries, currentDate);

    queries.map(async (query) => {
      const res = await axios.post(`${process.env.BOT_API_ENDPOINT}/scrape`, {
        query,
        currentDate
      });

      data = {
        currentDate: currentDate,
        google_link_count: data.google_link_count + res.data.google_link_count,
        google_image_count: data.google_image_count + res.data.google_image_count,
        google_video_count: data.google_video_count + res.data.google_video_count,
        bing_link_count: data.bing_link_count + res.data.bing_link_count,
        bing_image_count: data.bing_image_count + res.data.bing_image_count,
        bing_video_count: data.bing_video_count + res.data.bing_video_count,
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

    });

    const scrapeSummary = await ScrapeSummary.create({ ...data });

    res.status(200).send({
      ...scrapeSummary
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
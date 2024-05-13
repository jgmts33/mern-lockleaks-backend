import axios from "axios";
import db from "../models/index.js";
import { extractDomain } from "../utils/index.js";

const { scrapeSummary: ScrapeSummary, customKeywords: CustomKeywords, basicKeywords: BasicKeywords } = db;

export const scrapeData = async (req, res) => {
  const { username, link } = req.body;
  const { id } = req.params;

  try {

    const customKeyword = await CustomKeywords.findOne({
      where: {
        website: extractDomain(link)
      }
    });

    let query = "";

    if (customKeyword) {
      let array_keywords = customKeyword.keywords.split(",");
      array_keywords.map((item) => query += `${username} ${item},`);
      query = query.slice(0, -1);
    }
    else {
      const array_keywords = await BasicKeywords.findAll();
      array_keywords.map((item) => query += `${username} ${item.keyword},`);
      query = query.slice(0, -1);
    }

    const { data } = await axios.post(`${process.env.BOT_API_ENDPOINT}/scrape`, {
      query,
      user_id: id
    });

    if (data.currentDate) {
      res.status(200).send({
        ...data
      });
    }

    else res.status(500).send({
      message: "Something went wrong!",
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
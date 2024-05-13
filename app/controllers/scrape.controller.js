import axios from "axios";
import db from "../models/index.js";
import { extractDomain } from "../utils/index.js";

const { scrapeSummary: ScrapeSummary, customKeywords: CustomKeywords, basicKeyworkds: BasicKeywords } = db;

export const scrapeData = async (req, res) => {
  const { username, link } = req.body;

  try {

    const customKeyword = await CustomKeywords.findOne({
      where: {
        website: extractDomain(link)
      }
    });

    let query = "";

    if (customKeyword) {
      let array_keywords = customKeyword.keywords.split(",") ;
      array_keywords.map((item) => query += `${username} ${item},`);
      query = query.slice(0, -1);
    }
    else {
      const basicKeywords = await BasicKeywords.findAll();
      basicKeywords.map((item) => query +`${username} ${item},`);
      query = query.slice(0, -1);
    }
    console.info("query------------->", query);
    const { data } = await axios.post(`${process.env.BOT_API_ENDPOINT}/scrape`, {
      query
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
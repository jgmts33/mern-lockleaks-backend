import db from "../models/index.js";

const { basicKeyworkds: BasicKeywords, customKeywords: CustomKeywords } = db;

export const addNewKeyword = async (req, res) => {
  const { website, keyword, keywords } = req.body;

  try {

    let newKeyword;

    if (website) {
      newKeyword = await CustomKeywords.create({
        website,
        keywords,
      });
    } else {
      newKeyword = await BasicKeywords.create({
        keyword,
      });
    }
    res.status(200).send({
      ...newKeyword
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const editCustomKeywords = (req, res) => {
  const { id, website, keywords } = req.body;

  try {

    CustomKeywords.findByPk(id).then((item) => {
      item.update({
        website: website,
        keywords: keywords
      });

      return res.status(200).json({
        message: "Custom Keyword Updated Successfully!"
      });
    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
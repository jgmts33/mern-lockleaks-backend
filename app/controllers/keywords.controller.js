import db from "../models/index.js";

const { basicKeywords: BasicKeywords, customKeywords: CustomKeywords } = db;

export const addNewKeyword = (req, res) => {
  const { website, keyword, keywords } = req.body;

  try {

    if (website) {
      CustomKeywords.create({
        website,
        keywords,
      });
    } else {
      BasicKeywords.create({
        keyword,
      });
    }
    res.status(200).send({
      message: "Keyword added successfully!"
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
        website: website ,
        keywords: keywords
      });

      return res.status(200).json({
        message: "Custom Keyword Updated Successfully!"
      });
    }). catch((err) => {
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
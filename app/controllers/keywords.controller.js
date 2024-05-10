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
    if (website) {
      res.status(200).send({
        id: newKeyword.id,
        keyword: newKeyword.keyword
      });
    } else {
      res.status(200).send({
        id: newKeyword.id,
        website: newKeyword.website,
        keyword: newKeyword.keywords
      });
    }


  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const editCustomKeywords = (req, res) => {
  const { website, keywords } = req.body;
  const { id } = req.params;

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

export const deleteBasicKeyword = async (req, res) => {
  const { id } = req.params;

  try {

    await BasicKeywords.destroy({
      where: {
        id: id
      }
    });
    return res.status(200).json({
      message: "Custom Keyword Updated Successfully!"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const deleteCustomKeyword = async (req, res) => {
  const { id } = req.params;

  try {

    await CustomKeywords.destroy({
      where: {
        id: id
      }
    });
    return res.status(200).json({
      message: "Custom Keyword Updated Successfully!"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getBasicKeywords = async (req, res) => {

  try {

    const data = await BasicKeywords.findAll();

    return res.status(200).json(
      ...data
    );

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getCustomKeywords = async (req, res) => {

  try {

    const data = await CustomKeywords.findAll();

    return res.status(200).json(
      ...data
    );

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
import axios from "axios";
import db from "../models/index.js";
import path from 'path';

const { dmcaImages: DmcaImages } = db;

export const getDmcaImages = async (req, res) => {

  try {

    const usernamesList = await DmcaImages.findAll();

    res.status(200).send(usernamesList);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateDmcaImageOrder = async (req, res) => {

  const { id } = req.params;
  const { order } = req.body;

  try {

    await DmcaImages.findByPk(id).then(async(image) => {
      await image.update({
        position_order: order
      })
    });

    res.status(200).send({
      message: "Order updated successfully!"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const downloadDmcaImages = async (req, res) => {

  try {

    const filePath = path.join(__dirname, `images/${req.query.filename}`);

    res.download(filePath);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getDmcaImage = async (req, res) => {

  try {

    const filePath = path.join(__dirname, `images/${req.query.filename}`);

    res.status(200).sendFile(filePath);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const uploadDmcaImages = async (req, res) => {

  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.file;
    const fileName = file.name;
    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[/,:]/g, '-').replace(/\s/g, '_');
    const filePath = path.join(__dirname, `uploads/${fileName.slice(0, -4)}_${currentDate}.png`);

    await file.mv(filePath);

    await DmcaImages.create({
      name: filePath
    });

    res.send({
      message: "File uploaded successfully!"
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message
    });
  }
}
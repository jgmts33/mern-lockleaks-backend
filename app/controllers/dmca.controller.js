import db from "../models/index.js";
import path from 'path';
import fs from 'fs';

const { dmcaImages: DmcaImages, postions: Positions } = db;

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

export const downloadDmcaImages = async (req, res) => {

  try {

    const filePath = path.join(`./uploads/${req.query.filename}`);

    res.download(filePath);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const uploadDmcaImages = async (req, res) => {

  console.log("req:", req.files);

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
    const filePath = path.join(`./uploads/${fileName.slice(0, -4)}_${currentDate}.png`);

    await file.mv(filePath);

    await DmcaImages.create({
      name: `${fileName.slice(0, -4)}_${currentDate}.png`
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

export const deleteDmcaImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await DmcaImages.findByPk(id);

    if (!image) {
      return res.status(404).send('Image not found');
    }

    // Delete the file from the file system
    await fs.promises.unlink(`/root/lockleaks-backend/uploads/${image.name}`);

    // Delete the image record from the database
    await image.destroy();

    res.send('Image deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting image');
  }
};

export const getDmcaBadgesPositions = async (req, res) => {

  try {
    const data = await Positions.findOne({
      where: {
        name: 'dmcaBadges'
      },
      attributes: ['positions']
    });

    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error Getting data');
  }

}

export const updateDmcaBadgesPositions = async (req, res) => {
  const { data } = req.body;
  try {
    const dmcaPositions = await Positions.findOne({
      where: {
        name: 'dmcaBadges'
      }
    });

    await dmcaPositions.update({
      positions: data
    });

    return res.status(200).send(dmcaPositions.positions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error Getting data');
  }

}
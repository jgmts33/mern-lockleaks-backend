import axios from "axios";
import db from "../models/index.js";
import path from 'path';
import fs from 'fs';

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
  const { newOrder } = req.body;

  try {
    // Find the image with the specified ID
    const image = await DmcaImages.findByPk(id);

    if (!image) {
      return res.status(404).send('Image not found');
    }

    // Get the current order of the image
    const currentOrder = image.order;

    // Update the order of the image
    await image.update({ order: newOrder });

    // Adjust the orders of other images
    if (newOrder > currentOrder) {
      // Decrement the order of images with orders between currentOrder and newOrder
      await DmcaImages.update(
        { order: Sequelize.literal('"order" - 1') },
        {
          where: {
            order: { [Op.between]: [currentOrder + 1, newOrder] },
          },
        }
      );
    } else {
      // Increment the order of images with orders between newOrder and currentOrder
      await DmcaImages.update(
        { order: Sequelize.literal('"order" + 1') },
        {
          where: {
            order: { [Op.between]: [newOrder, currentOrder - 1] },
          },
        }
      );
    }

    res.send('Order updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating order');
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

export const getDmcaImage = async (req, res) => {

  try {

    const filePath = path.join(`/root/lockleaks-backend/uploads/${req.query.filename}`);

    res.status(200).sendFile(filePath);

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
    await fs.promises.unlink(image.name);

    // Delete the image record from the database
    await image.destroy();

    res.send('Image deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting image');
  }
};
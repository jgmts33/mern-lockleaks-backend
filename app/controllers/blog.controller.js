import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";
import path from 'path';

const { blog: Blog } = db;

export const getBlogs = async (req, res) => {

  try {

    const blogList = await Blog.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'shortContent', 'moderatorInfo', 'banner']
    });

    res.status(200).send(blogList);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getBlog = async (req, res) => {

  const { id } = req.params;

  try {

    const blog = await Blog.findByPk(id);

    res.status(200).send(blog);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const createBlog = async (req, res) => {

  const { title, content, shortContent, tags } = req.body;
  const banner = req.files['banner'];
  const avatar = req.files['moderatorInfo[avatar]'];

  try {

    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[/,:]/g, '-').replace(/\s/g, '_');

    const bannerFilePath = path.join(`./uploads/${banner.name.slice(0, -4)}_${currentDate}.png`);
    const avatarFilePath = path.join(`./uploads/${avatar.name.slice(0, -4)}_${currentDate}.png`);

    await banner.mv(bannerFilePath);
    await avatar.mv(avatarFilePath);

    await Blog.create({
      title: title,
      moderatorInfo: {
        name: req.body['moderatorInfo[name]'],
        avatar: `${avatar.name.slice(0, -4)}_${currentDate}.png`,
        description: req.body['moderatorInfo[description]'],
      },
      shortContent: shortContent,
      content: content,
      banner: `${banner.name.slice(0, -4)}_${currentDate}.png`,
      tags: tags.split(",")
    });

    res.status(200).send({
      message: "Blog created Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateBlog = async (req, res) => {

  const { id } = req.params;
  const { title, content, shortContent, tags } = req.body;
  const banner = req.files ? req.files['banner'] : null;
  const avatar = req.files ? req.files['moderatorInfo[avatar]'] : null;

  const currentDate = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).replace(/[/,:]/g, '-').replace(/\s/g, '_');

  try {

    const blog = await Blog.findByPk(id);

    let updateData = {
      title,
      shortContent,
      content,
      tags: tags.split(",")
    }
    if (banner) {
      const bannerFilePath = path.join(`./uploads/${banner.name.slice(0, -4)}_${currentDate}.png`);
      await banner.mv(bannerFilePath);
      updateData = {
        ...updateData,
        banner: `${banner.name.slice(0, -4)}_${currentDate}.png`
      }
    }
    
    let moderatorInfo = {
      name: req.body['moderatorInfo[name]'],
      description: req.body['moderatorInfo[description]'],
      avatar: blog.moderatorInfo.avatar
    }

    if (avatar) {
      const avatarFilePath = path.join(`./uploads/${avatar.name.slice(0, -4)}_${currentDate}.png`);
      await avatar.mv(avatarFilePath);

      moderatorInfo = {
        name: req.body['moderatorInfo[name]'],
        avatar: `${avatar.name.slice(0, -4)}_${currentDate}.png`,
        description: req.body['moderatorInfo[description]'],
      }

    }

    blog.update({
      ...updateData,
      moderatorInfo,
    });

    res.status(200).send({
      message: "Blog updated Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getSimilarBlogs = async (req, res) => {
  const { id, tags } = req.query;

  let _tags = tags.split(",");

  try {
    const randomBlogs = await Blog.findAll({
      where: {
        tags: {
          [Op.overlap]: _tags // Find blogs with tags that contain at least one of the specified tags
        },
        id: {
          [Op.ne]: id,
        }
      },
      order: Sequelize.literal('random()'), // Get random order of blogs
      limit: 4, // Limit to 4 blogs,
      attributes: ['id', 'title', 'shortContent', 'moderatorInfo', 'banner']
    });

    res.json(randomBlogs);

  } catch (error) {
    console.error('Error fetching random blogs:', error);
    res.status(500).json({ error: 'An error occurred while fetching random blogs' });
  }
};

export const deleteBlog = async (req, res) => {

  const { id } = req.params;

  try {

    const blog = await Blog.findByPk(id);
    blog.destroy();

    res.status(200).send({
      message: "Blog deleted Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
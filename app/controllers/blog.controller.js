import axios from "axios";
import db from "../models/index.js";
import { Sequelize } from "sequelize";

const { blog: Blog } = db;

export const getBlogs = async (req, res) => {

  try {

    const blogList = await Blog.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'shortContent', 'moderatorInfo']
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

  console.log("req:", req.files);
  const { title, content, shortContent } = req.body;
  const banner = req.files['banner'];
  const avatar = req.files['moderatorInfo[avatar]'];

  try {

    await Blog.create({
      title: title,
      moderatorInfo: {
        name: req.body['moderatorInfo[name]'],
        avatar: avatar,
        description: req.body['moderatorInfo[description]'],
      },
      shortContent: shortContent,
      content: content,
      banner: JSON.stringify(banner)
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
  const { title, content, shortContent } = req.body;
  const banner = req.files ? req.files['banner'] : null;
  const avatar = req.files ? req.files['moderatorInfo[avatar]'] : null;

  try {

    const blog = await Blog.findByPk(id);
    let updateData = {
      title: title,
      shortContent: shortContent,
      content: content,
    }
    if (banner) {
      updateData.banner = banner
    }
    let moderatorUpdateQueryStr = `jsonb_set(moderatorInfo, '{description, name}', '[${req.body['moderatorInfo[name]']}, ${req.body['moderatorInfo[description]']}]')`;

    if (avatar) {
      moderatorUpdateQueryStr = `jsonb_set(moderatorInfo, '{description, name, avatar}', '[${req.body['moderatorInfo[name]']}, ${req.body['moderatorInfo[description]']}, ${avatar}]')`;
    }

    blog.update({
      ...updateData,
      moderatorInfo: Sequelize.literal(moderatorUpdateQueryStr)
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
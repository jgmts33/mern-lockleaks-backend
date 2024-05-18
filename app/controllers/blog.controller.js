import axios from "axios";
import db from "../models/index.js";

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

  const data = req.body;

  console.log("data:", data);

  try {

    // await Blog.create({
    //   title: title,
    //   moderatorInfo: moderatorInfo,
    //   shortContent: shortContent,
    //   content: content
    // });

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
  const { title, moderatorInfo, shortContent, content } = req.body;

  try {

    const blog = await Blog.findByPk(id);
    blog.update({
      title,
      moderatorInfo,
      shortContent,
      content
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
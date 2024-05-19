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

  console.log("req:", req.files);
  const { title, content, shortContent } = req.body;
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

    const bannerFilePath = path.join(`./blogs/banners/${banner.name.slice(0, -4)}_${currentDate}.png`);
    const avatarFilePath = path.join(`./blogs/avatars/${avatar.name.slice(0, -4)}_${currentDate}.png`);

    await file.mv(bannerFilePath);
    await file.mv(avatarFilePath);

    await Blog.create({
      title: title,
      moderatorInfo: {
        name: req.body['moderatorInfo[name]'],
        avatar: `https://server.lockleaks.com/blogs/avatars/${avatar.name.slice(0, -4)}_${currentDate}.png`,
        description: req.body['moderatorInfo[description]'],
      },
      shortContent: shortContent,
      content: content,
      banner: `https://server.lockleaks.com/blogs/banners/${banner.name.slice(0, -4)}_${currentDate}.png`
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
    let moderatorInfo = {
      name: req.body['moderatorInfo[name]'],
      description: req.body['moderatorInfo[description]'],
      avatar: blog.moderatorInfo.avatar
    }

    if (avatar) {
      moderatorInfo = {
        name: req.body['moderatorInfo[name]'],
        description: req.body['moderatorInfo[description]'],
        avatar: avatar
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
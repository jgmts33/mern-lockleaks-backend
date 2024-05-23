export default function (sequelize, Sequelize) {
  const Blog = sequelize.define("customer_reviews", {
    name: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
    },
    refer_link: {
      type: Sequelize.STRING
    },
    telegram: {
      type: Sequelize.STRING
    },
    discord: {
      type: Sequelize.STRING
    },
    twitter: {
      type: Sequelize.STRING
    },
    instagram: {
      type: Sequelize.STRING
    },
    reddit: {
      type: Sequelize.STRING
    },
    tiktok: {
      type: Sequelize.STRING
    },
    facebook: {
      type: Sequelize.STRING
    }
  });

  return Blog;
}
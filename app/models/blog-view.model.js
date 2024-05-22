export default function (sequelize, Sequelize) {
  const BlogViews = sequelize.define("blog_views", {
    ip: {
      type: Sequelize.STRING
    },
    user_agent: {
      type: Sequelize.STRING
    },
    blog_id: {
      type: Sequelize.INTEGER
    },
    visited_at: {
      type: Sequelize.DATE
    },
  });

  return BlogViews;
}
export default function (sequelize, Sequelize) {
  const HelpArticles = sequelize.define("help_articles", {
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    categoryId: {
      type: Sequelize.INTEGER
    },
    likes: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      default: []
    },
    dislikes: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      default: []
    }
  });

  return HelpArticles;
}
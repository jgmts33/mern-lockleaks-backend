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
    }
  });

  return HelpArticles;
}
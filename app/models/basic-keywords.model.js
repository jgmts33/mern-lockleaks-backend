export default function (sequelize, Sequelize) {
  const BasicKeywords = sequelize.define("basic-keywords", {
    keyword: {
      type: Sequelize.STRING
    }
  });

  return BasicKeywords;
}
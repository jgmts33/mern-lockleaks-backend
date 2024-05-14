export default function (sequelize, Sequelize) {
  const BasicKeywords = sequelize.define("basic_keywords", {
    keyword: {
      type: Sequelize.STRING
    }
  });

  return BasicKeywords;
}
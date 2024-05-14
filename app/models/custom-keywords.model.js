export default function (sequelize, Sequelize) {
  const CustomKeywords = sequelize.define("custom_keywords", {
    website: {
      type: Sequelize.STRING
    },
    keywords: {
      type: Sequelize.STRING
    }
  });

  return CustomKeywords;
}
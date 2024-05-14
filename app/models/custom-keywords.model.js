export default function (sequelize, Sequelize) {
  const CustomKeywords = sequelize.define("custom-keywords", {
    website: {
      type: Sequelize.STRING
    },
    keywords: {
      type: Sequelize.STRING
    }
  });

  return CustomKeywords;
}
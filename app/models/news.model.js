export default function (sequelize, Sequelize) {
  const News = sequelize.define("news", {
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
    }
  });

  return News;
}
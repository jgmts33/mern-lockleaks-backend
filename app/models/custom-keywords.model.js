export default function (sequelize, Sequelize) {
  const User = sequelize.define("custom-keywords", {
    website: {
      type: Sequelize.STRING
    },
    keywords: {
      type: Sequelize.STRING
    }
  });

  return User;
}
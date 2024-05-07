export default function (sequelize, Sequelize) {
  const User = sequelize.define("basic-keywords", {
    keyword: {
      type: Sequelize.STRING
    }
  });

  return User;
}
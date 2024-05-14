export default function (sequelize, Sequelize) {
  const Usernames = sequelize.define("usernames", {
    username: {
      type: Sequelize.STRING
    },
    link: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    }
  });

  return Usernames;
}
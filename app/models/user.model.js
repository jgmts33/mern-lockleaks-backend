export default function (sequelize, Sequelize) {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    verified: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return User;
}
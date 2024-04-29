export default function (sequelize, Sequelize) {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING,
      default: ""
    },
    verified: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    subscription: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return User;
}
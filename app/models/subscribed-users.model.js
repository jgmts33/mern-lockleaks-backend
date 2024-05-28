export default function (sequelize, Sequelize) {
  const SubscribedUsers = sequelize.define("subcribed_users", {
    email: {
      type: Sequelize.STRING
    },
    ip_address: {
      type: Sequelize.STRING,
      default: ""
    },
    device: {
      type: Sequelize.STRING,
      default: ""
    }
  });

  return SubscribedUsers;
}
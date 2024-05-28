export default function (sequelize, Sequelize) {
  const SubscribedUsers = sequelize.define("subscribed_users", {
    email: {
      type: Sequelize.STRING
    }
  });

  return SubscribedUsers;
}
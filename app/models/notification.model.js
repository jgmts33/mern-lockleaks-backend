export default function (sequelize, Sequelize) {
  const Notifications = sequelize.define("notifications", {
    content: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER
    }
  });

  return Notifications;
}
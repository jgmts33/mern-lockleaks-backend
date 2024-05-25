export default function (sequelize, Sequelize) {
  const Messages = sequelize.define("messages", {
    name: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING,
      default: ''
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    sender_id: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.TEXT
    },
    attached_images: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    ticket_id: {
      type: Sequelize.STRING
    }
  });

  return Messages;
}
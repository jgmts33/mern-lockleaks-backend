export default function (sequelize, Sequelize) {
  const Messages = sequelize.define("messages", {
    sender_id: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.TEXT
    },
    attached_images: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    ticket_id: {
      type: Sequelize.STRING
    }
  });

  return Messages;
}
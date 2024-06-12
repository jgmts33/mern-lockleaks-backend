export default function (sequelize, Sequelize) {
  const Tickets = sequelize.define("tickets", {
    name: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    count: {
      type: Sequelize.INTEGER,
      default: 0
    },
    user_id: {
      type: Sequelize.INTEGER
    }
  });

  return Tickets;
}
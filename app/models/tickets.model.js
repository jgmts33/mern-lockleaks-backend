export default function (sequelize, Sequelize) {
  const Tickets = sequelize.define("tickets", {
    name: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER
    }
  });

  return Tickets;
}
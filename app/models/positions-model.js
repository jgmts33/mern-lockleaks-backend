export default function (sequelize, Sequelize) {
  const Positions = sequelize.define("positions", {
    name: {
      type: Sequelize.STRING
    },
    positions: {
      type: Sequelize.JSONB
    }
  });

  return Positions;
}
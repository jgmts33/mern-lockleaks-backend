export default function (sequelize, Sequelize) {
  const PingModels = sequelize.define("ping_models", {
    website: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      default: []
    },
    links: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      default: []
    },
    success: {
      type: Sequelize.BOOLEAN,
      default: false
    },
  });

  return PingModels;
}
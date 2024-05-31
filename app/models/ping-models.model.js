export default function (sequelize, Sequelize) {
  const PingModels = sequelize.define("ping_models", {
    model_name: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      default: []
    },
    platform: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      default: []
    },
    social_media: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      default: []
    },
    response: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    goal: {
      type: Sequelize.BOOLEAN,
      default: false
    },
  });

  return PingModels;
}
export default function (sequelize, Sequelize) {
  const PingModels = sequelize.define("ping_models", {
    model_name: {
      type: Sequelize.STRING
    },
    platform: {
      type: Sequelize.STRING
    },
    social_media: {
      type: Sequelize.STRING
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
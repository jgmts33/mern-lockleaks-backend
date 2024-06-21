export default function (sequelize, Sequelize) {
  const TestBots = sequelize.define("test_bots", {
    scanner: {
      type: Sequelize.STRING,
      default: ''
    },
    social: {
      type: Sequelize.STRING,
      default: ''
    },
    ai_face: {
      type: Sequelize.STRING,
      default: ''
    },
    rr_photo: {
      type: Sequelize.STRING,
      default: ''
    },
    rr_user: {
      type: Sequelize.STRING,
      default: ''
    }
  });

  return TestBots;
}
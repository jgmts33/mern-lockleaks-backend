export default function (sequelize, Sequelize) {
  const SocialSummaries = sequelize.define("social_summaries", {
    file: {
      type: Sequelize.STRING
    },
    result: {
      type: Sequelize.INTEGER,
      default: 0
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    downloaded: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    expired: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return SocialSummaries;
}
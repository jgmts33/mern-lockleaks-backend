export default function (sequelize, Sequelize) {
  const RRPhotoSummaries = sequelize.define("rr_photo_summaries", {
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
    },
    progress: {
      type: Sequelize.INTEGER,
      default: 0
    }
  });

  return RRPhotoSummaries;
}
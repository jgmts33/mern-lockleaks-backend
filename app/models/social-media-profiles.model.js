export default function (sequelize, Sequelize) {
  const SocialMediaProfiles = sequelize.define("social_media_profiles", {
    name: {
      type: Sequelize.STRING
    },
    count: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    accepted: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return SocialMediaProfiles;
}
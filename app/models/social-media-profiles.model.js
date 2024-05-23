export default function (sequelize, Sequelize) {
  const SocialMediaProfiles = sequelize.define("social_media_profiles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    count: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    }
  });

  return SocialMediaProfiles;
}
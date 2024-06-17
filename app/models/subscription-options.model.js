export default function (sequelize, Sequelize) {
  const SubscriptionOptions = sequelize.define("subscription_options", {
    option_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    usernames: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    scanner: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    adult_tubs: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    file_hosted: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    google: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    bing: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ai_face: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    sm_scanner: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    sm_submit: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    r2r_of_user_content: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    dmca_badges: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    data_report: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    data_analytics: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    personal_agent: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    download_data: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });

  return SubscriptionOptions;
}
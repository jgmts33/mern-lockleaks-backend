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
    personal_agent_requests: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    unlimited_takedowns: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    daily_reports: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    dmca_badges: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    monthly_pdf_reports: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    analyzer_tool_search_engines_scans_perDay: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    reverify_reanalyzer_tool_rescans_perDay: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    google_results_images_videos_removal_report: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    bing_results_images_videos_removal_report: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    social_media_analyzer_tool_removal_report: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    social_media_profile_submition: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    adult_tubes_analyzer_tool_removal_report: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    forums_analyzer_removal_report: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    file_host_analyzer_tool_removal_report: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    face_recognition_ai_analyzer_removal_report: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    monthly_rport_data_analytics_insights: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    usernames_history_content_recovery_removal_report: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });

  return SubscriptionOptions;
}
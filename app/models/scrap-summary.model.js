export default function (sequelize, Sequelize) {
  const ScrapeSummaries = sequelize.define("scrape-summaries", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    scrape_date: {
      type: Sequelize.STRING
    },
    total_google_links: {
      type: Sequelize.INTEGER,
      default: 0
    },
    total_google_images: {
      type: Sequelize.INTEGER,
      default: 0
    },
    total_google_videos: {
      type: Sequelize.INTEGER,
      default: 0
    },
    total_bing_links: {
      type: Sequelize.INTEGER,
      default: 0
    },
    total_bing_images: {
      type: Sequelize.INTEGER,
      default: 0
    },
    total_bing_videos: {
      type: Sequelize.INTEGER,
      default: 0
    },
    good_count: {
      type: Sequelize.INTEGER,
      default: 0
    },
    other_count: {
      type: Sequelize.INTEGER,
      default: 0
    },
    bad_count: {
      type: Sequelize.INTEGER,
      default: 0
    },
    new_count: {
      type: Sequelize.INTEGER,
      default: 0
    },
    report_count: {
      type: Sequelize.INTEGER,
      default: 0
    },
    no_report_count: {
      type: Sequelize.INTEGER,
      default: 0
    },
    matches_count: {
      type: Sequelize.INTEGER,
      default: 0
    },
    no_matches_count: {
      type: Sequelize.INTEGER,
      default: 0
    },
    user_id: {
      type: Sequelize.INTEGER
    }
  });

  return ScrapeSummaries;
}
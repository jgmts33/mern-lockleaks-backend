export default function (sequelize, Sequelize) {
  const DmcaImages = sequelize.define("dmca_images", {
    name: {
      type: Sequelize.STRING
    },
    position_order: {
      type: Sequelize.INTEGER,
      default: -1
    }
  });

  return DmcaImages;
}
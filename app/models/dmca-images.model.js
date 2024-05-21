export default function (sequelize, Sequelize) {
  const DmcaImages = sequelize.define("dmca_images", {
    name: {
      type: Sequelize.STRING
    }
  });

  return DmcaImages;
}
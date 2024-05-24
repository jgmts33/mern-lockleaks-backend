export default function (sequelize, Sequelize) {
  const VpsList = sequelize.define("vps_lists", {
    ip_address: {
      type: Sequelize.STRING
    },
    subdomain: {
      type: Sequelize.STRING,
      default: "api.lockleaks.com"
    }
  });

  return VpsList;
}
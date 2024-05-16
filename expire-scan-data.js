import { Sequelize } from "sequelize";
import db from "./app/models/index.js";
const { scrapeSummary: ScrapeSummary } = db;

(async () => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30); // Calculate 30 days ago

  try {
    const expiredData = await ScrapeSummary.update(
      { status: 'expired' },
      { where: { createdAt: { [Sequelize.Op.lt]: expirationDate } } }
    );

    console.log("expiredData:", expiredData);

    console.log(`Updated ${expiredData.length} records as expired.`);
  } catch (error) {
    console.error('Error updating expired data:', error);
  }
})();
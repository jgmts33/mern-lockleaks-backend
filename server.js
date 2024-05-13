import express from 'express';
import cors from 'cors';
import db from './app/models/index.js';
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import { configDotenv } from 'dotenv';
import keywordsRoutes from './app/routes/keywords.routes.js';
import scrapeRoutes from './app/routes/scrape.routes.js';

configDotenv();

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

db.sequelize.sync({ force: true }).then(() => {
  db.role.create({
    id: 1,
    name: "user"
  });

  db.role.create({
    id: 2,
    name: "moderator"
  });

  db.role.create({
    id: 3,
    name: "admin"
  });
});

app.get("/", (req, res) => {
  res.send({ mesage: "Server is alive" });
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})

authRoutes(app);
userRoutes(app);
keywordsRoutes(app);
scrapeRoutes(app);
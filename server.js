import express from 'express';
import cors from 'cors';
import db from './app/models/index.js';
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();

app.use(cors());

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

app.get("/api", (req, res) => {
  res.send({ mesage: "Server is alive" });
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})

authRoutes(app);
userRoutes(app);
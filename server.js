import express from 'express';
import cors from 'cors';
import db from './app/models/index.js';
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import { configDotenv } from 'dotenv';

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

app.get("/", (req, res) => {
  res.send({ mesage: "Server is alive" });
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})

authRoutes(app);
userRoutes(app);
import express from 'express';
import cors from 'cors';
import db from './app/models/index.js';
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import { configDotenv } from 'dotenv';
import keywordsRoutes from './app/routes/keywords.routes.js';
import scrapeRoutes from './app/routes/scrape.routes.js';
import http from 'http';
import { Server } from 'socket.io';
import usernamesRoutes from './app/routes/usernames.routes.js';
import dmcaRoutes from './app/routes/dmca.routes.js';
import blogRoutes from './app/routes/blog.routes.js';

configDotenv();

const app = express();

app.use(cors({
  origin: "*"
}));

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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true
  }
});

io.on("connection", (socket) => {

  console.log("New user connected on socketId", socket.id);

  socket.emit("welcome", "Conncted to Socket Server.");

  authRoutes(app);
  userRoutes(app);
  keywordsRoutes(app);
  scrapeRoutes(app);
  usernamesRoutes(app);
  dmcaRoutes(app);
  blogRoutes(app);

  socket.on('disconnect', (info) => {
    console.log("disconnected:", info);
  });

})
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})



export { io };
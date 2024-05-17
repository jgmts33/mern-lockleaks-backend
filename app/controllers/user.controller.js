import db from "../models/index.js";

const { user: User} = db;

export const getUserInfo = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.getRoles().then(roles => {

        res.status(200).send({
          email: user.email,
          roles: roles.map((role) => role.name),
          name: user.name,
          avatar: user.avatar,
          verified: user.verified,
          subscription: user.subscription,
          social: user.social
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}
export const allAccess = (req, res) => {
  res.status(200).send("User Content");
}
export const adminBoard = (req, res) => {
  res.status(200).send("Admin Content");
}
export const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content");
}
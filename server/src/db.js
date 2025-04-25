import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./tripzy.db",
});

sequelize.query("PRAGMA foreign_keys = ON;");

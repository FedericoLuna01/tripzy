import "dotenv/config";
import { Sequelize } from "sequelize";

const { DATABASE_URL } = process.env;

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
});

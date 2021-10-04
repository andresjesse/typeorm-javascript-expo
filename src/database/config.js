import * as SQLite from "expo-sqlite";

import Car from "./entities/Car";

const config = {
  database: "mydatabase",
  driver: SQLite,
  entities: [Car],
  synchronize: true,
  type: "expo",
};

export default config;

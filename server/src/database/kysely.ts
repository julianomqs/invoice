import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";
import { DB } from "./db.js";

const dialect = new MysqlDialect({
  pool: createPool({
    database: process.env.DB_DATABASE,
    host: "db",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    typeCast: function (field, next) {
      if (field.type === "NEWDECIMAL") {
        const val = field.string();
        return val === null ? null : Number(val);
      }

      return next();
    }
  })
});

export const db = new Kysely<DB>({
  dialect
});

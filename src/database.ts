import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({ override: true });
let client: Pool;

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  POSTGRES_TEST_USER,
  POSTGRES_TEST_PASSWORD,
} = process.env;

if (process.env.ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_TEST_USER,
    password: POSTGRES_TEST_PASSWORD,
  });
  console.log(
    `[Database] Initializing connection pool for database: "${POSTGRES_TEST_DB}"`,
  );
} else {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
  console.log(
    `[Database] Initializing connection pool for database: "${POSTGRES_DB}"`,
  );
}

export default client;

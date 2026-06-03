require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  try {
    console.log("Conectando...");
    await client.connect();

    console.log("Conectado");

    const result = await client.query("SELECT NOW()");
    console.log(result.rows);

    await client.end();
  } catch (err) {
    console.error(err);
  }
})();
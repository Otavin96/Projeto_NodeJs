import { conection } from '../database/conection'

const { client } = conection()

export const ListAccount = async () => {
    await client.query("SELECT * FROM Accounts", (err, result) => {
      if (err) {
        console.error("Error executing query", err);
      } else {
        console.log("Query result:", result.rows);
      }

      // Close the connection when done
      client
        .end()
        .then(() => {
          console.log("Connection to PostgreSQL closed");
        })
        .catch((err) => {
          console.error("Error closing connection", err);
        });
    });
}
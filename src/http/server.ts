import { app } from "./app";
import { config } from "dotenv";
import { dataSource } from "../database/datasource";

config();

const port = process.env.PORT;

const main = async () => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
  });

  dataSource
    .initialize()
    .then(() => {
      console.log("Conexão com o Postgres rodando com sucesso!");
    })
    .catch((err) => {
      console.log("Erro ao iniciar a conexao com o Banco de Dados!", err);
    });
};

main().catch((error) => {
  console.log("Erro ao iniciar o servidor!", error);
});

import "@/common/infrastructure/container/index";
import { env } from "../env";
import { dataSource } from "../typeorm";
import { app } from "./app";

const main = async () => {
  app.listen(env.PORT, () => {
    console.log(`Servidor rodando na porta: ${env.PORT}`);
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

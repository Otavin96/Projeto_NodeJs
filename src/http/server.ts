import { app } from "./app";
import { config } from "dotenv";

config();

const port = process.env.PORT;

const main = async () => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
  });
};

main().catch((error) => {
  console.log("Erro ao iniciar o servidor!", error);
});

import { upload } from "@/users/infrastructure/http/middlewares/updatedAvatar";
import Routes from "express";
import { CreatePetsController } from "../controller/create-pets-controller";
import { DeletePetsController } from "../controller/delete-pets-controller";
import { SearchPetsController } from "../controller/search-pets-controller";
import { UpdatePetsController } from "../controller/update-pets-controller";

const petsRoutes = Routes.Router();

petsRoutes.post("/", upload.array("images"), async (req, res) => {
  CreatePetsController(req, res);
});

petsRoutes.get("/", async (req, res) => {
  SearchPetsController(req, res);
});

petsRoutes.put("/:id", upload.array("images"), async (req, res) => {
  UpdatePetsController(req, res);
});

petsRoutes.delete("/:id", async (req, res) => {
  DeletePetsController(req, res);
});

export { petsRoutes };

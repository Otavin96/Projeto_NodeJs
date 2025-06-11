import { Router } from "express";
import { CreateAdoptionController } from "../controller/create-adoptions.controller";

const adoptionsRoutes = Router();

adoptionsRoutes.post("/", async (request, response) => {
  CreateAdoptionController(request, response);
});

export { adoptionsRoutes };

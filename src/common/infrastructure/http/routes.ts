import { adoptionsRoutes } from "@/adoptions/infrastructure/http/routes/adoption.routes";
import { petsRoutes } from "@/pets/infrastructure/http/routes/pets.routes";
import { userRoutes } from "@/users/infrastructure/http/routes/user.routes";
import { Router } from "express";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/pets", petsRoutes);
routes.use("/adoptions", adoptionsRoutes);

export { routes };

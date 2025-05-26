import { userRoutes } from "@/users/infrastructure/http/routes/user.routes";
import { Router } from "express";

const routes = Router();

routes.use("/users", userRoutes);

export { routes };

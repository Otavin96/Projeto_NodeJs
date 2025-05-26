import { Router } from "express";
import { CreateUserController } from "../controllers/create-user.controller";

import { UpdateAvatarController } from "../controllers/update-avatar.controller";
import { upload } from "../middlewares/updatedAvatar";

const userRoutes = Router();

userRoutes.post("/", async (req, res) => {
  CreateUserController(req, res);
});

userRoutes.patch("/avatar", upload.single("file"), async (req, res) => {
  UpdateAvatarController(req, res);
});

export { userRoutes };

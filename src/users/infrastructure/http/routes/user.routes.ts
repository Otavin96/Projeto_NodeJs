import { Router, Request, Response } from "express";
import { CreateUserController } from "../controllers/create-user.controller";
import { UpdateAvatarController } from "../controllers/update-avatar.controller";
import { upload } from "../middlewares/updatedAvatar";
import { DeleteUserController } from "../controllers/delete-user.controller";
import { SearchUserController } from "../controllers/search-user.controller";
import { UpdateUserController } from "../controllers/update-user.controller";
import { AuthenticateUserController } from "../controllers/authenticate-user.controller";

const userRoutes = Router();

userRoutes.post("/", async (req: Request, res: Response) => {
  CreateUserController(req, res);
});

userRoutes.delete("/:id", async (req: Request, res: Response) => {
  DeleteUserController(req, res);
});

userRoutes.put("/:id", async (req: Request, res: Response) => {
  UpdateUserController(req, res);
});

userRoutes.get("/", async (req: Request, res: Response) => {
  SearchUserController(req, res);
});

userRoutes.patch(
  "/avatar",
  upload.single("file"),
  async (req: Request, res: Response) => {
    UpdateAvatarController(req, res);
  }
);

userRoutes.post("/authenticate/", AuthenticateUserController);

export { userRoutes };

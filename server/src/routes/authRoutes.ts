import { Router } from "express";
import { signup, login } from "../controllers/authController";

const router: Router = Router();

//post routes
router.post("/login", login);
router.post("/signup", signup);

export default router;

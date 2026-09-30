import { Router } from "express";
import { searchLabsController } from "../controllers/search.controller.js";

const router = Router();

router.get("/search", searchLabsController);

export default router;
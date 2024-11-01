import { Router } from "express";
import { getLikes, getUserProfileAndRepos, likeprofile } from "../controllers/user.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";


const router = Router();

router.get("/profile/:username",getUserProfileAndRepos);
router.get("/likes",ensureAuthenticated,getLikes);
router.post("/like/:username",ensureAuthenticated,likeprofile)

export default router;
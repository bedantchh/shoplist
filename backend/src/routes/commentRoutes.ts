import { Router } from "express";
import * as commentController from "../controller/commentController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.post("/:productId",requireAuth(),commentController.createComment)
router.delete("/:productId",requireAuth(),commentController.deleteComment)


export default router;

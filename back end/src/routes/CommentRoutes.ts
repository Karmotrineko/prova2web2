import { Router } from "express";

import CommentController from "../controllers/CommentController";

const CommentRouter = Router();


//Listar usuários
CommentRouter.get("/comments", CommentController.listComments);

CommentRouter.post("/comment", CommentController.createComment);

CommentRouter.put("/comment/:id", CommentController.updateComment);

CommentRouter.delete("/comment/:id", CommentController.deleteComment);

CommentRouter.delete("/comments", CommentController.nukeComments);

export default CommentRouter;
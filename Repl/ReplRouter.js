import express from 'express';
import commentRouter from './ReplRegister.js';
import ReplRouter from "./ReplList.js";
import DeleteRouter from "./ReplDelete.js";

const router = express.Router();
// Repl-Insert 라우트
router.use('/repl-insert',commentRouter);

// Repl-List 라우트
router.use('/repl-list', ReplRouter);

// Repl-Delete 라우트
router.use('/repl-delete', DeleteRouter);

export default router;

import express from 'express';
import commentRouter from './ReplRegister.js';
import ReplRouter from "./ReplList.js";
import DeleteRouter from "./ReplDelete.js";

const router = express.Router();

router.use('/repl-insert',commentRouter);

router.use('/repl-list', ReplRouter);

router.use('/repl-delete', DeleteRouter);

export default router;

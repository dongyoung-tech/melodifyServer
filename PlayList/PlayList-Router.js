import express from 'express';
import InputRouter from "./PlayList-input.js";
import CheckRouter from "./Play-List-Select.js";
import ListRouter from "./Play-List-list.js";
const router = express.Router();

router.use('/playList-input',InputRouter);

router.use('/playList-Check',CheckRouter);

router.use('/playList-List',ListRouter);

export default router;

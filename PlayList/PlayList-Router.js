import express from 'express';
import InputRouter from "./PlayList-Input.js";
import CheckRouter from "./Play-List-Select.js";
import ListRouter from "./Play-List-list.js";
import DeleteRouter from "./Play-List-Delete.js";

const router = express.Router();

router.use('/playList-input',InputRouter);

router.use('/playList-Check',CheckRouter);

router.use('/playList-List',ListRouter);

router.use('/playList-Delete',DeleteRouter);

export default router;

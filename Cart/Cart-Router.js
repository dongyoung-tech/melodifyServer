import express from 'express';
import listRouter from './Cart-list.js';
import insertRouter from "./Cart-Insert.js";
import UpdateRouter from "./Cart-Update.js";

const router = express.Router();
// Repl-Insert 라우트
router.use('/cart-insert',insertRouter);

// Repl-List 라우트
router.use('/cart-update', UpdateRouter);

// Repl-Delete 라우트
router.use('/cart-list', listRouter);

export default router;

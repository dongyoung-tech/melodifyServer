import express from 'express';
import AlbumRouter from "./TopAlbums.js";
import ArtistRouter from "./TopArtist.js";
const router = express.Router();
// Repl-Insert 라우트
router.use('/top-artist',ArtistRouter);

// Repl-List 라우트
router.use('/top-album', AlbumRouter);


export default router;

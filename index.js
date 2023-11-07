import express from 'express'
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import { getKeywordData } from './keyword/keyword.js';
const port = 3001;
import {getYoutubeData} from './keyword/youtube.js';
import {getAlbumData} from './keyword/Album.js';
import {getBlogData} from "./keyword/Blog.js";
import { getDetailInfo, getDetailAlbum, getDetail } from './keyword/Detail.js';
import {getAlbums} from "./Music/TopAlbums.js";
import { handleRegister, upload } from './Member/register.js';
import loginRouter from './Member/login.js';
import {getArtists} from "./Music/TopArtist.js";
import commentRouter from './Repl/ReplRegister.js';
import ReplRouter from "./Repl/ReplList.js";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function sendResponse(req, res, promise) {
    promise
        .then(data => {
            res.json(data); // 비동기 작업이 완료된 후 응답으로 데이터 전송
        })
        .catch(error => {
            console.error('Error:', error); // 에러 처리
            res.status(500).send('Error fetching data');
        });
}




app.get('/keyword/:key', (req, res) => {
    const q = req.query;
    sendResponse(req, res, getKeywordData(q.key,q.cat));
    console.log(q);
});
app.get('/Detail/:key', (req, res) => {
    const q = req.query;
    sendResponse(req, res, getDetail(q.cat,q.key));
    console.log("detail",q);
});

app.get('/album/:key', (req, res) => {
    const q = req.query;
    console.log(q);
    sendResponse(req, res, getAlbumData(q.key));
});
app.get('/youtube/:id', (req, res) => {
    const q = req.query;
    sendResponse(req, res, getYoutubeData(q.key));
    console.log(q);
});
app.get('/blog/:key', (req, res) => {
    const q = req.query;
    sendResponse(req, res, getBlogData(q.key));
    console.log(q);
});

app.get('/topalbum/:key', (req, res) => {
    const q = req.query;
    sendResponse(req, res, getAlbums(q.cat));
});

app.get('/topartist/:key', (req, res) => {
    const q = req.query;
    sendResponse(req, res, getArtists(q.cat));
});

app.post('/register', upload.single('profile'), handleRegister);

app.use('/login', loginRouter);

app.use('/repl-insert', commentRouter);

app.use('/repl-list', ReplRouter);

app.get('/', (req, res) => {
    res.send('gd');
});

app.listen(port, () => {
    console.log('server is running!');
});


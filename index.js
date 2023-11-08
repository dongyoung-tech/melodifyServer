import express from 'express'
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import setGlobalMiddleware from "middlewares/Middlewares.js";
import applyRoutes  from "routes/index.js";
import { getKeywordData } from './keyword/keyword.js';
const port = 3001;
import {getYoutubeData} from './keyword/youtube.js';
import {getAlbumData} from './keyword/Album.js';
import {getBlogData} from "./keyword/Blog.js";
import MusicRouter from "./Music/Music-Router.js";
import {getDetail } from './keyword/Detail.js';
import { handleRegister, upload } from './Member/register.js';
import loginRouter from './Member/login.js';
import ReplRouter from "./Repl/ReplRouter.js";
import CartRouter from "./Cart/Cart-Router.js";
import PlayListRouter from "./PlayList/PlayList-Router.js";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

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
setGlobalMiddleware(app); // 별도 파일에서 전역 미들웨어 적용
applyRoutes(app);

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

app.post('/register', upload.single('profile'), handleRegister);

app.use('/login', loginRouter);

app.use('/repl', ReplRouter);

app.use('/cart', CartRouter);

app.use('/music', MusicRouter);

app.use('/play-list', PlayListRouter);

app.get('/', (req, res) => {
    res.send('gd');
});

app.listen(port, () => {
    console.log('server is running!');
});


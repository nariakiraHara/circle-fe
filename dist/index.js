"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRender = void 0;
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const dotenv_1 = __importDefault(require("dotenv"));
// import productRouter from '../routes/product' 
dotenv_1.default.config();
console.log(process.env.NODE_ENV);
const dev = process.env.NODE_ENV !== "production";
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3001;
const render = (req, res, path, data) => {
    // URLの最後にスラッシュがあってもなくてもページを表示させる
    const replacedPath = path.endsWith('/') ? path.slice(0, -1) : path;
    console.log('called render ');
    app.render(req, res, replacedPath, data);
};
const renderError = (req, res, statusCode, data) => {
    res.status(statusCode);
    app.renderError(null, req, res, req.path, data);
};
/**
 * next.jsのrender関数を取得
 */
const getRender = () => render;
exports.getRender = getRender;
const start = async () => {
    await app.prepare();
    const server = express_1.default();
    server.get('/product', async (req, res) => {
        console.log('product index');
        console.log(req.path);
        const query = { sample: 'hoge' };
        getRender()(req, res, req.path, query);
    });
    // server.all("*", (req: Request, res: Response) => {
    // 	return handle(req, res);
    // });  
    // staticファイルのリクエストのハンドリング
    server.get(['/_next/*', '/static/*'], (req, res) => {
        return handle(req, res);
    });
    // server.use(productRouter)
    server.listen(port, (err) => {
        if (err)
            throw err;
        console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
};
try {
    start();
}
catch (e) {
    console.log(e);
}

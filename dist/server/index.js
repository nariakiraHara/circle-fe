"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRender = void 0;
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_1 = __importDefault(require("../routes/product"));
dotenv_1.default.config();
console.log(process.env.NODE_ENV);
const dev = process.env.NODE_ENV !== "production";
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3001;
const render = (req, res, path, data) => {
    app.render(req, res, path, data);
};
const getRender = () => render;
exports.getRender = getRender;
app.prepare().then(() => {
    const server = express_1.default();
    // server.all("*", (req: Request, res: Response) => {
    // 	return handle(req, res);
    // });
    server.use(product_1.default);
    server.listen(port, (err) => {
        if (err)
            throw err;
        console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
});

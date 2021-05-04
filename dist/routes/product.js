"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("../server");
const router = express_1.default.Router();
router.get('/product', async (req, res) => {
    const query = { sample: 'this is app' };
    console.log('pass the route');
    server_1.getRender()(req, res, req.path, query);
});
// router.get(
//   '/product',
//   async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     console.log('product index')
//     console.log(req.path)
//     const query = { sample: 'hoge'}
//     getRender()(req, res, req.path, query)
//   }
// )
exports.default = router;

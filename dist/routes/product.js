"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("../server");
const router = express_1.default.Router();
router.get('/product', async (req, res) => {
    const query = { sample: 'hoge' };
    server_1.getRender()(req, res, req.path, query);
});
exports.default = router;
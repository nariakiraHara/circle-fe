import express, { Request, Response } from 'express'
import next from 'next'
import dotenv from 'dotenv'
// import productRouter from '../routes/product' 

dotenv.config()
console.log(process.env.NODE_ENV)
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3001;
const render = (req: express.Request, res: express.Response, path: string, data?: any): void => {
  // URLの最後にスラッシュがあってもなくてもページを表示させる
  const replacedPath = path.endsWith('/') ? path.slice(0, -1) : path
	console.log('called render ')
  app.render(req, res, replacedPath, data)
}
const renderError = (req: express.Request, res: express.Response, statusCode: number, data?: any): void => {
  res.status(statusCode)
  app.renderError(null, req, res, req.path, data)
}

/**
 * next.jsのrender関数を取得
 */
const getRender = (): Function => render
const start = async (): Promise<void> => {
	await app.prepare()
	const server = express();
	server.get(
		'/product',
		async (req: express.Request, res: express.Response) => {
			console.log('product index')
			console.log(req.path)
			const query = { sample: 'hoge'}
			getRender()(req, res, req.path, query)
		}
	)
	// server.all("*", (req: Request, res: Response) => {

	// 	return handle(req, res);
	// });  
	// staticファイルのリクエストのハンドリング
  server.get(['/_next/*', '/static/*'], (req, res) => {
    return handle(req, res)
  })
	// server.use(productRouter)
	server.listen(port, (err?: any) => {
		if (err) throw err;
		console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
	});
}

try {
	start()
} catch (e) {
	console.log(e)
}

export { getRender }
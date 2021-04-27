import express, { Request, Response } from 'express'
import next from 'next'
import dotenv from 'dotenv'

dotenv.config()
console.log(process.env.NODE_ENV)
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3001;

app.prepare().then(() => {
	const server = express();
	server.all("*", (req: Request, res: Response) => {

		return handle(req, res);
	});
	server.listen(port, (err?: any) => {
		if (err) throw err;
		console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
	});
});
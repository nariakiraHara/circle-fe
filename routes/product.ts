import express from 'express'
import { getRender } from '../server'

const router = express.Router()
router.get('/product', async (req: express.Request, res: express.Response) => {
  const query = { sample: 'this is app'}
  console.log('pass the route')
  getRender()(req, res, req.path, query)
})
// router.get(
//   '/product',
//   async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     console.log('product index')
//     console.log(req.path)
//     const query = { sample: 'hoge'}
//     getRender()(req, res, req.path, query)
//   }
// )

export default router
/**
 * Created by leekoho on 2018/1/18.
 */
import $ from '../../controllers/link'
import verify from '../../middleware/verify'

export default async(router) => {
  router.get('/link', $.getLinkList)
  router.post('/link', verify, $.createLink)
  router.delete('/link/:id', verify, $.deleteLink)
  router.patch('/link/:id', verify, $.updateLink)
}
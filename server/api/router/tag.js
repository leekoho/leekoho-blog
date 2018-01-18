/**
 * Created by leekoho on 2018/1/18.
 */
import $ from '../../controllers/tag'
import verify from '../../middleware/verify'

export default async(router) => {
  router.get('/tag', $.getTagList)
  // router.get('/tag/:id', $.getTag)
  router.post('/tag', verify, $.createTag)
  router.delete('/tag/:id', verify, $.deleteTag)
  router.patch('/tag/:id', verify, $.updateTag)
}
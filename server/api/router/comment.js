/**
 * Created by leekoho on 2018/1/19.
 */
import $ from '../../controllers/comment'
import verify from '../../middleware/verify'

export default async(router) => {
  router.get('/comment', verify, $.getAllCommentList)
  router.post('/comment', $.createComment)
  router.delete('/comment/:id', verify, $.deleteComment)
  router.patch('/comment/:id', verify, $.replayComment)
}
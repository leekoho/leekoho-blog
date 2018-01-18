/**
 * Created by leekoho on 2018/1/13.
 */
import $ from '../../controllers/article'
import verify from '../../middleware/verify'

export default async(router) => {
  router.get('/article', $.getArticleList)
  router.get('/draft', verify, $.getDraftList)
  router.get('/article/:id', $.getArticle)
  router.post('/article', $.createArticle)
  router.delete('/article/:id', verify, $.deleteArticle)
  router.patch('/article/:id', verify, $.updateArticle)
}

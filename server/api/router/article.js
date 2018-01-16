/**
 * Created by leekoho on 2018/1/13.
 */
import $ from '../../controllers/article'
import verify from '../../middleware/verify'

const frontPrefix = '/front'

export default async(router) => {
  // router.get('/article', $.getArticlesList)
  // router.post('/article', verify, $.createArticle)
  // router.delete('/article/:id', verify, $.deleteArticle)
  // router.patch('/article/:id', verify, $.updateArticle)
  router.get('/article', $.getFrontArticleList)
  router.get('/article/:id', $.getFrontArticle)
  router.post('/article', $.createArticle)
  router.delete('/article/:id', verify, $.deleteArticle)
  router.patch('/article/:id', verify, $.updateArticle)
}

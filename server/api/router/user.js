/**
 * Created by leekoho on 2018/1/16.
 */
import $ from '../../controllers/user'
import verify from '../../middleware/verify'

export default async(router) => {
  $.initUser()
  router.post('/signIn', $.signIn)
  router.post('/signOut', $.signOut)
  router.patch('/user/:id', verify, $.updateUser)
}
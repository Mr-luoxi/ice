const Router = require('koa-router')
const router = new Router();
const config =require('../config/index') 
const sha1 = require('sha1')
// import config from '../config/index'
// import Router from 'koa-router'
// export const router = app =>{
  // const router = new Router()
  router.get('/wechat-hear',(ctx,next)=>{
    // console.log(config.wechat.token)
    const token = config.wechat.token
    const{
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query
    const str = [token,timestamp,nonce].sort().join('')
    const sha = sha1(str)
    console.log(sha === signature)
    if(sha === signature){
      ctx.body = echostr
    }else{
      ctx.body = 'Failed'
    }

  })
  // .post('wechat-hear',(ctx,next)=>{
  //   next()
  // })
// }

  module.exports = router
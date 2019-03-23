import mongoose from 'mongoose'
import config from '../server/config'
import fs from 'fs'
import { resolve } from 'path';

const models = resolve(__dirname,'../server/database/schema')

fs.readFileSync(models)
  .filter(file => ~file.search(/^[^\.].*js&/))
  .forEach(file => require(resolve(models,file)))

export const database = app =>{
  mongoose.set('debug',true)
  mongoose.connect(config.db)
  mongoose.connect.on('disconnected',()=>{
    mongoose.connect(config.db)
  })
  mongoose.connect.on('error',err=>{
    console.error(err)
  })  
  mongoose.connect.on('open',async=>{
    console.error('Connected to mongodb',config.db)
  })
}
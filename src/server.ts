import express from 'express'
import {IHandler} from './core/shared/IHandler'
import userHandler from './core/handler/userHandler'
import itemHandler from './core/handler/itemHandler'
import bodyParser from 'body-parser'
import {mongoConnection} from './core/utils/database/mongoDB/connection'
require('dotenv').config()
class App{
    _defaultApps: express.Application
    _mongoConnection: mongoConnection
    constructor(_h: IHandler[]){
        this._defaultApps = express()
        this._mongoConnection = new mongoConnection
        this.plugin()
        this.initHandler(_h)
    }
    protected plugin(): void{
        this._defaultApps.use(bodyParser.json())
        this._defaultApps.use(bodyParser.urlencoded({extended:true}))
    }
    protected initHandler(_h: IHandler[]) { 
        _h.forEach((controller) => { 
            this._defaultApps.use('/api/v1', controller.router);
        })
      }
}

const app = new App([
   new userHandler(),
   new itemHandler()
]) 

app._defaultApps.listen(process.env.PORT||5000, () => { 
    console.log(`aplikasi ini berjalan di port ${process.env.PORT||5000}`);
})
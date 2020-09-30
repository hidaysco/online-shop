import {Router, Request , Response} from 'express'
import {IHandler} from '../shared/IHandler'
import {auth} from '../utils/helper/auth/jwt_auth'
import {commandWorker} from '../repositories/itemRepositories/command/commandWorker'
import {queryWorker} from '../repositories/itemRepositories/query/queryWorker'

export default class userHandler implements IHandler {
    path = '/items'
    router = Router()
    query: queryWorker
    command: commandWorker
    constructor() {
        this.initRouter()
        this.query = new queryWorker()
        this.command = new commandWorker()
    }
    private initRouter():void{
        this.router.post(`${this.path}/add`, auth, this.create)
        this.router.get(`${this.path}/`, auth, this.getItem)
        this.router.get(`${this.path}/:id`, auth, this.getDetail)
        this.router.put(`${this.path}/:id`,auth, this.update)
        this.router.delete(`${this.path}/:id`,auth, this.delete)
    }
    
    private create = async (req: Request, res: Response) => {
        const data :any =req.body
        data.author = req.user
        const result = await this.command.create(data)
        let message,code;
        if (result) {
            message = "Success Adding Items"
            code=201
        }else{
            message = "Cant Adding Item"
            code = 409
        }
        res.status(code)
        .send({
                succes: true,
                data: result,
                message: message,
                code: code
            })
    }
    private getItem = async (req: Request, res: Response)=>{
        let message,code;
        const result = await this.query.getItem()
        if (result) {
            message = "Item Detail"
            code = 200
        }else{
            message = "Cant Find Item"
            code = 404
        }
        res.status(code)
        .send({
                succes: true,
                data: result,
                message: message,
                code: code
            })
    } 
    private getDetail = async (req: Request, res: Response)=>{
        const {id}= req.params
        let message,code;
        const result = await this.query.getDetail(id)
        if (result) {
            message = "Item Detail"
            code = 200
        }else{
            message = "Cant Find Item"
            code = 404
        }
        res.status(code)
        .send({
                succes: true,
                data: result,
                message: message,
                code: code
            })
    } 

    private update = async (req: Request, res: Response)=>{
        const {id} = req.params
        const data = req.body
        const result = await this.command.update(id,data)
        let message,code;
        if (result) {
            message = "Item Updated"
            code=200
        }else{
            message = "Item Unupdated"
            code = 409
        }
        res.status(code)
        .send({
                succes: true,
                data: result,
                message: message,
                code: code
            })
    } 

    private delete = async (req: Request, res: Response)=>{
        const {id} = req.params
        const result = await this.command.delete(id)
        let message,code;
        if (result) {
            message = "Success Delete Item"
            code=201
        }else{
            message = "Cant Delete"
            code = 409
        }
        res.status(code)
        .send({
                succes: true,
                data: result,
                message: message,
                code: code
            })
    } 
}

import {Router, Request , Response} from 'express'
import bcryptjs from 'bcryptjs'
import {IHandler} from '../shared/IHandler'
import {auth} from '../utils/helper/auth/jwt_auth'
import {commandWorker} from '../repositories/userRepositories/command/commandWorker'
import {queryWorker} from '../repositories/userRepositories/query/queryWorker'

export default class userHandler implements IHandler {
    path = '/users'
    router = Router()
    bcrypt = bcryptjs
    query: queryWorker
    command: commandWorker
    constructor() {
        this.initRouter()
        this.query = new queryWorker()
        this.command = new commandWorker()
    }
    private initRouter():void{
        this.router.post(`${this.path}/register`, this.register)
        this.router.post(`${this.path}/login`, this.login)
        this.router.get(`${this.path}/:id`, auth, this.getUserById)
        this.router.put(`${this.path}/:id`,auth, this.update)
        this.router.delete(`${this.path}/:id`,auth, this.delete)
        this.router.get(`${this.path}/`, this.data)
    }
    private data(req: Request, res: Response) {
        res.send('aww')
    }
    private register = async (req: Request, res: Response) => {
        const data :any =req.body
        const result = await this.command.registerUser(data)
        let message,code;
        if (result) {
            message = "User Registered"
            code=201
        }else{
            message = "User Unregistered"
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

    private login = async (req: Request, res: Response) => {
        const data :any =req.body
        let result = await this.query.login(data)
        let status,message,code;
        if (result===null) {
            status = false
            message = "Not Match"
            code = 409
        }else{
            status = true
            message = "User Loginned"
            code=200
        }
        res.status(code)
        .send({
                succes: status,
                data: result,
                message: message,
                code: code
            })
    }

    private getUserById = async (req: Request, res: Response)=>{
        const {id}= req.params
        const params = req.body
        let message,code;
        const result = await this.query.getDetail(id, params)
        if (result) {
            message = "User Founded"
            code = 200
        }else{
            message = "User Unregistered"
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
            message = "User Updated"
            code=200
        }else{
            message = "User Unupdated"
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
            message = "User Unregistered"
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

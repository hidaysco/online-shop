import bcryptjs from 'bcryptjs'
import {command} from './command'
export default interface IQuery {
    registerUser(data: any): Promise <any>
    update(id: string,data: any): Promise <any>
    delete(id: string): Promise <any>
}
export class commandWorker implements IQuery {
    _command: command
    bcrypt = bcryptjs
    constructor(){
        this._command= new command()
    }
    registerUser(data: any): Promise<any> {
        data.password = this.bcrypt.hashSync(data.password,this.bcrypt.genSaltSync(10))
        return new Promise((resolve, reject) => {
            this._command.registerUser(data).then((result) => {
                resolve(result);
            }).catch((err: Error) => {
                reject(err);
            })
        })
    }
    update(id:string ,data?:any): Promise<any> {
        data.password = this.bcrypt.hashSync(data.password,this.bcrypt.genSaltSync(10))
        return new Promise((resolve, reject) => {
            this._command.update(id, data).then((result) => {
                resolve(result);
            }).catch((err: Error) => {
                reject(err);
            })
        })
    }
    delete(id:string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._command.delete(id).then((result) => {
                resolve(result);
            }).catch((err: Error) => {
                reject(err);
            })
        })
    }
    
}
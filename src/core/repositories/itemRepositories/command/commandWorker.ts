import bcryptjs from 'bcryptjs'
import {command} from './command'
export default interface ICommand {
    create(data: any): Promise <any>
    update(id: string,data: any): Promise <any>
    delete(id: string): Promise <any>
}
export class commandWorker implements ICommand {
    command: command
    bcrypt = bcryptjs
    constructor(){
        this.command= new command()
    }
    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.command.create(data).then((result) => {
                resolve(result);
            }).catch((err: Error) => {
                reject(err);
            })
        })
    }
    update(id:string ,data?:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.command.update(id, data).then((result) => {
                resolve(result);
            }).catch((err: Error) => {
                reject(err);
            })
        })
    }
    delete(id:string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.command.delete(id).then((result) => {
                resolve(result);
            }).catch((err: Error) => {
                reject(err);
            })
        })
    }
    
}
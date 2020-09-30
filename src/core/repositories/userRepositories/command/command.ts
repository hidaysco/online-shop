import {IUser,MUser} from '../../../model/userModel'
import {QueryProxy}from '../../../utils/database/mongoDB/db'
export default interface IQuery {
    registerUser(data: IUser): Promise <any>
    update(id: string,data: IUser): Promise <any>
    delete(id: string): Promise <any>
}
export class command implements IQuery {
    _command: QueryProxy
    constructor(){
        this._command= new QueryProxy(MUser)
    }

    registerUser(data: IUser): Promise<any> {
        return new Promise((resolve, reject) => {
            this._command.create(data).then((result) => {
                resolve(result);
            }).catch((err: Error) => {
                reject(err);
            })
        })
    }
    update(id:string ,data: IUser): Promise<any> {
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
import {IItem,MItem} from '../../../model/itemModel'
import {QueryProxy}from '../../../utils/database/mongoDB/db'
export default interface IQuery {
    create(data: IItem): Promise <any>
    update(id: string,data: IItem): Promise <any>
    delete(id: string): Promise <any>
}
export class command implements IQuery {
    _command: QueryProxy
    constructor(){
        this._command= new QueryProxy(MItem)
    }

    create(data: IItem): Promise<any> {
        return new Promise((resolve, reject) => {
            this._command.create(data).then((result) => {
                resolve(result);
            }).catch((err: Error) => {
                reject(err);
            })
        })
    }
    update(id:string ,data: IItem): Promise<any> {
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
import {MItem} from '../../../model/itemModel'
import {QueryProxy}from '../../../utils/database/mongoDB/db'
export default interface IQuery {
    getDetail(id: string): Promise <any>
    getItem(): Promise <any>
}
export class query implements IQuery {
    query: QueryProxy
    constructor(){
        this.query= new QueryProxy(MItem)
    }
    getItem(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.query.find().then((result) => {
                resolve(result);
            }).catch((err: Error) => {
                reject(err);
            })
        })
    }
    getDetail(id: string,params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.query.findById(id,params).then((result) => {
                resolve(result);
            }).catch((err: Error) => {
                reject(err);
            })
        })
    }

    
}
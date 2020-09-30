import {MUser} from '../../../model/userModel'
import {QueryProxy}from '../../../utils/database/mongoDB/db'
export default interface IQuery {
    getUserById(id: string): Promise <any>
    login(data: any): Promise <any>
}
export class query implements IQuery {
    _query: QueryProxy
    constructor(){
        this._query= new QueryProxy(MUser)
    }
    login(email: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._query.findOne({email}).then((result) => {
                resolve(result);
            }).catch((err: Error) => {
                reject(err);
            })
        })
    }
    getUserById(id: string,params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._query.findById(id,params).then((result) => {
                resolve(result);
            }).catch((err: Error) => {
                reject(err);
            })
        })
    }

    
}
import bcryptjs from 'bcryptjs'
import { query } from './query'
export default interface IDomain {
    getDetail(id: string): Promise <any>
    getItem(): Promise <any>
}
export class queryWorker implements IDomain{
    bcrypt = bcryptjs
    _query: query
    constructor() {
        this._query = new query()
    }
    getDetail = async (id:string)=>{
        const result = await this._query.getDetail(id)
        if (result) {
            return result
        }
        return null
    } 
    getItem = async ()=>{
        const result = await this._query.getItem()
        if (result) {
            return result
        }
        return null
    } 
}

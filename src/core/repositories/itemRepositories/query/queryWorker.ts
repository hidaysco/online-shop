import bcryptjs from 'bcryptjs'
import { query } from './query'
export default interface IDomain {
    getDetail(id: string): Promise <any>
    getItem(): Promise <any>
}
export class queryWorker implements IDomain{
    bcrypt = bcryptjs
    query: query
    constructor() {
        this.query = new query()
    }
    getDetail = async (id:string)=>{
        const result = await this.query.getDetail(id)
        if (result) {
            return result
        }
        return null
    } 
    getItem = async ()=>{
        const result = await this.query.getItem()
        if (result) {
            return result
        }
        return null
    } 
}

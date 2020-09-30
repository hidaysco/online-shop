import bcryptjs from 'bcryptjs'
import {query} from './query'
import {generate} from '../../../utils/helper/auth/jwt_auth'
export default interface IDomain {
    getDetail(id: string): Promise <any>
    login(data: any, params?:any): Promise <any>
}
export class queryWorker implements IDomain{
    bcrypt = bcryptjs
    _query: query
    constructor() {
        this._query = new query()
    }
    login = async(data: any)=>{
        const result = await this._query.login(data.email)
        const hash = this.bcrypt.compareSync(data.password, result.password)
        if (hash) {
            const hasil = {
                name : result.name,
                token: await generate(result,1008)
            }
            return hasil
        }
        return null
    } 
    getDetail = async (id:string, params?:any)=>{
        const result = await this._query.getUserById(id,params)
        if (result) {
            return result
        }
        return null
    } 
}

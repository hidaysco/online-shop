import mongoose from 'mongoose';

export interface IQueryProxy { 
  create(data: any): Promise<any>;
  findById(id: string): Promise<any>;
  update(id: string, data?: any): Promise<any>;
  delete(id: string): Promise<any>;
  findOne(data: any): Promise<any>;
  find(data?: any): Promise<any>;
}

export class QueryProxy implements IQueryProxy {
  public model: mongoose.Model<mongoose.Document>
  constructor(modelName: mongoose.Model<mongoose.Document>) { 
    this.model = modelName;
  }
  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const r =this.model.findByIdAndDelete(id)
      r.exec((err, result) => { 
        if (!err) { 
          return resolve(result);
        } 
        return reject(err);
      })
    })
  }
  update(id: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const x =this.model.findById(id).update(data)
      x.exec((err, result) => { 
        if (result) { 
          const r =this.model.findById(id)
          return resolve(r);
        } 
        return reject(err);
      })
    })
  }

  findById(id: string, params?:any): Promise<any> {
    return new Promise((resolve, reject) => {
      const r =this.model.findById(id).select(`-${params?.except}`)
      r.exec((err, result) => { 
        if (!err) { 
          return resolve(result);
        } 
        return reject(err);
      })
    })
  }

  create(data: any): Promise<any> {
      return new Promise((resolve, reject) => {
          this.model.create(data).then((result) => {
              resolve(result);
          }).catch((err: Error) => {
              reject(err);
          })
          })
      }

  findOne(data: any,): Promise<any> {
    return new Promise((resolve, reject) => {
      const r = this.model.findOne(data).lean(true)
      r.exec((err, result) => { 
        if (!err) { 
          return resolve(result);
        } 
        return reject(err);
      })
    })
  }

  find(data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const r = this.model.find(data).lean(true)
      r.exec((err, result) => { 
        if (!err) { 
          return resolve(result);
        } 
        return reject(err);
      })
    })
  }
}  
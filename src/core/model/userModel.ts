
import mongoose from "mongoose";

export interface IUser { 
  name: string,
  email: string,
  username: string,
  password: string,
  createdAt?: Date,
  updatedAt?: Date
}
const schema =  new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  createdAt: {type:Date, default:Date.now},
  updatedAt: {type:Date, default:Date.now}
})

schema.pre('update', function update() {
  this.update({}, {
    $set: {
      updatedAt: Date.now()
    }
  })
});
export const MUser = mongoose.model<IUser & mongoose.Document>('users', schema);

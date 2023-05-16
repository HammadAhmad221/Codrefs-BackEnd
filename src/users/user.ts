/*export interface User {
    id: number;
    email: string;
    name: string;
    status?: "Happy" | "Sad";
    phoneNumbers: string[];
  }*/
  import { IsEmail,IsNotEmpty,IsOptional,MinLength } from 'class-validator';
  import { Schema, model } from 'mongoose';

  /*export class User {
    @IsNotEmpty()
    @MinLength(5)
    username!: string;
    @IsNotEmpty()
    password!: string;
  }  
const userSchema = new Schema<User>({
  username: { type: String, unique: true,required:true },
  password: {type: String, required:true}
});*/
export class User {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(12)
  email!: string;
  @IsOptional()
  company?:string;
  @IsOptional()
  firstName?:string;
  @IsOptional()
  lastName?:string;
  @IsNotEmpty()
  @MinLength(5)
  password!: string;
  created?:Date;
  //@IsOptional()
  //plan!:Schema.Types.ObjectId;
}  
const userSchema = new Schema<User>({
email: { type: String , unique: true,required:true },
company: {type: String},
firstName: {type: String},
lastName: {type: String},
password: {type: String, required:true},
created:{type:Date,default:new Date()}
//plan: {type:Schema.Types.ObjectId,ref:"Plan"}
});

export const UserModel = model<User>('User', userSchema);
  
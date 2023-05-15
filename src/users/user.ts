/*export interface User {
    id: number;
    email: string;
    name: string;
    status?: "Happy" | "Sad";
    phoneNumbers: string[];
  }*/
  import { IsNotEmpty,MinLength } from 'class-validator';
  import { Schema, model } from 'mongoose';

  export class User {
    @IsNotEmpty()
    @MinLength(5)
    username!: string;
  
    @IsNotEmpty()
    password!: string;
  }  
const userSchema = new Schema<User>({
  username: { type: String, unique: true,required:true },
  password: {type: String, required:true}
});

export const UserModel = model<User>('User', userSchema);
  
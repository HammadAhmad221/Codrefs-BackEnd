/*export interface User {
    id: number;
    email: string;
    name: string;
    status?: "Happy" | "Sad";
    phoneNumbers: string[];
  }*/

  import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  id: number,
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model<User>('User', userSchema);
  
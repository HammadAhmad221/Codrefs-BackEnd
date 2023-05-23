import { IsOptional,IsNotEmpty } from 'class-validator';
import { Schema, model } from 'mongoose';

export class GoogleUser {
  @IsOptional()
  id!: string;

  @IsOptional()
  name?: string;

  @IsNotEmpty()
  email!: string;
}

const googleUserSchema = new Schema<GoogleUser>({
  id: { type: String },
  name: { type: String },
  email: { type: String },
});

export const GoogleUserModel = model<GoogleUser>('GoogleUser', googleUserSchema);

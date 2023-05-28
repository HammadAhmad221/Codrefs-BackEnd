import { Schema,model } from "mongoose";
import { Subscription } from "../../../entities/subscription";


const subscriptionSchema = new Schema<Subscription>({
    email: { type: String ,required:true },
    created:{type:Date,default:new Date()}
    });
    
    export const SubscriptionModel = model<Subscription>('Subscription', subscriptionSchema);
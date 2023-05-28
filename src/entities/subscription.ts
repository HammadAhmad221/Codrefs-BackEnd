import moment from "moment";
import { ISubscription } from "../models/subscription";

export class Subscription implements ISubscription{
    email: string='';
    created: Date=moment().utc().toDate();

    constructor(email:string){
        this.email=email;
    }
    
}
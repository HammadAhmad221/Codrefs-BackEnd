
import { PLANS, USER_TYPES } from "../constants/constants";
import { User } from "../entities/user";
import bcrypt from 'bcrypt';
import { DatabaseService } from "../common/services/database.service";
import { Inject } from "typescript-ioc";
import { Subscription } from "../entities/subscription";
import { Types } from "mongoose";

export class UserRepository{

    
    constructor(@Inject private databaseService:DatabaseService){}


    getUserWithEmailAndPassword(email:string,password:string):Promise<any>{
        return new Promise(async (resolve,reject)=>{

            let user=await this.databaseService?.findUserWithEmail(email);

            if(user){
                const passwordMatch =await bcrypt.compare(password, user.password);

                if(passwordMatch){
                    resolve(user);
                }else{
                    reject("Password does not match");
                }
            }
            reject("User with this email does not exist");
        });
    }


    addUserWithEmail(email:string,password:string,company:string):Promise<any>{
        return new Promise(async (resolve,reject)=>{

            let userModel={
                
                email: email,
                company: company,
                firstName: "",
                lastName: "",
                password:password,
                type: USER_TYPES.ADMIN,
                author:new Types.ObjectId('6470844f446483348c608c3a'),
                plan: PLANS.BASIC,
                created: new Date(),
                updated: new Date()
                
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            let user=new User({...userModel,password:hashedPassword});

            try{
            let createdUser=await this.databaseService.createUser(user);

                resolve(createdUser);

            }catch(error){
                console.log("Create model error:",error);
                if(error.hasOwnProperty("code") && error.code==11000){
                    reject("User already exists with this email");
                }else{
                    reject("Could not create user");
                }
            }

        });
    }
    deleteUserById(id: string): Promise<void> {
        return this.databaseService.deleteUserById(id);
      }

      addSubscriptionWithEmail(email: string): Promise<boolean> {
        return this.databaseService.createEmailSubscription(new Subscription(email));
      }

      async getUsersByAuthor(author: Types.ObjectId): Promise<any> {
        try {
          const users = await this.databaseService.getUsersByAuthor(author);
          return users;
        } catch (error) {
          throw error;
        }
      }

}

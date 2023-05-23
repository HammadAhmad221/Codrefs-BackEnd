
import {Inject, Singleton} from 'typescript-ioc';
import { MongodbService } from '../../database/mongodb/mongodb.service';
import { UserModel } from '../../database/mongodb/schema/user';
import { User } from '../../entities/user';

@Singleton
export class DatabaseService{

  constructor(@Inject private mongodbService:MongodbService){}

   async connectToDB():Promise<void>{
        await this.mongodbService?.connect();
    } 

   async disconnectDB():Promise<void>{
    await this.mongodbService?.disconnect();
    
    }


    findUserWithEmail(email:string):Promise<any>{
      return new Promise(async (resolve,reject)=>{
        try{
        let response=await UserModel.findOne({email:email}).exec();
          
        resolve(response);

        }catch(error){
          reject(error);
        }
     
      });
    }
    findUserWithID(id:string):Promise<any>{
      return new Promise(async (resolve,reject)=>{
        try{
        let response=await UserModel.findOne({_id:id}).exec();
          
        resolve(response);

        }catch(error){
          reject(error);
        }
     
      });
    }

    createUser(user:User):Promise<any>{
      return new Promise(async(resolve,reject)=>{
        try{
        let response=await UserModel.create(user);
        resolve(response);
        }catch(error){
          reject(error);
        }
      })
    }


}

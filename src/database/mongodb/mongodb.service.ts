import { Singleton } from "typescript-ioc";
import mongoose from 'mongoose';
const path = require('path');

@Singleton
export class MongodbService {
//mongodb:coderefs:Ammar12345678@127.0.0.1:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true
    CONNECTION;
    options = this.getOptions();
   private connectionStrin=process.env.NODE_ENV=='production'?process.env.MONGODB_URI_PROD:process.env.MONGODB_URI_STAGE;

    getOptions() {
        let options;
        options = {
            dbName: 'prod',
            tlsCAFile: path.resolve("security/rds-combined-ca-bundle.pem"),
        };

        return options;
    }

    async connect() {
        if (this.CONNECTION) return this.CONNECTION;
        this.CONNECTION = await mongoose.
            connect(this.connectionStrin || "", this.options).
            then(c => c).
            catch(err => console.log(err)).finally(()=>{
                console.log("DB Connected");
            });

        if (!this.CONNECTION) throw ('MongoDB Coonection Problem');
        return this.CONNECTION;
    }


   async disconnect() {
        if (this.CONNECTION) {

            this.CONNECTION.disconnect();
            this.CONNECTION = null;

        }
    }



}
import { Singleton } from "typescript-ioc";
import mongoose from 'mongoose';
const path = require('path');

@Singleton
export class MongodbService {

    CONNECTION;
    options = this.getOptions();

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
            connect(process.env.MONGO_DB_CONNECTION_STRING || "", this.options).
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
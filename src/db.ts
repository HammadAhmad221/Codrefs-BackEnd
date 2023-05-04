import mongoose from 'mongoose';

  export async function connectDB(): Promise<void> {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as mongoose.ConnectOptions;
      
      mongoose.connect('mongodb://coderefs:Ammar12345678@127.0.0.1:27017/?authSource=admin&readPreference=primary&directConnection=true&ssl=true&tlsAllowInvalidCertificates=true&tlsAllowInvalidHostnames=true', options)
        .then(() => console.log('Connected to database!'))
        .catch(error => console.error('Error connecting to database:', error));
  }
  
  export function disconnectDB(): void {
    mongoose.disconnect();
  }
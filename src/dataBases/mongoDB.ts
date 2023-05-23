import mongoose from 'mongoose';

  export async function connectDB(): Promise<void> {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as mongoose.ConnectOptions;
      
      mongoose.connect('mongodb://0.0.0.0:27017', options)
        .then(() => console.log('Connected to database!'))
        .catch(error => console.error('Error connecting to database:', error));
  }
  
  export function disconnectDB(): void {
    mongoose.disconnect();
  }
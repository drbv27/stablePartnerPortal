import {connect, connection} from 'mongoose';

/* const DBURL: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/attendance'; */
const DBURL: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/attendance';

if (!DBURL) { throw new Error('Please define the MONGODB_URI environment variable inside .env.local'); }

const conn = { isConnected: false }//creo que no es necesario ni el de abajo

export async function connectDB() {
    try {
        const { connection } = await connect(DBURL);
        if (connection.readyState >= 1) {
            conn.isConnected = true;
            console.log("MongoDB connected");
            return Promise.resolve(true);
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(false);
    }
}

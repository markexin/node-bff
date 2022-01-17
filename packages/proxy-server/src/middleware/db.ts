import mongoose from 'mongoose';

export function dbSync(MONGO_URI: string) {
    return mongoose.connect(MONGO_URI);
}
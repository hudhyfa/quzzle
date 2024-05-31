import mongoose from 'mongoose';

const connect = async () => {
    if(mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect('mongodb://127.0.0.1/qwzzle', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("connection established");
    } catch (error) {
        throw new Error("Error connecting to Mongo")
    }
}

export default connect;
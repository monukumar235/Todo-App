import mongoose from "mongoose";

export const connectToDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("Connected Succesfully to database");
    } catch (error) {
        console.log("Error in Db Connection..");
        console.error(error.message);
        process.exit(1);
    }
}
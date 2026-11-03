import mongoose from "mongoose"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const connectDB = async() => {
    let retries = 3
    for(let attemtps = 0; attemtps < retries; attemtps++){
        try {
          await  mongoose.connect(process.env.MONGO_URL)
          console.log("MongoDB connected successfully");
          return
        } catch (error) {
            console.log(`attemtps ${attemtps + 1} failed: ${error.message}`);
            if(retries == attemtps){
                throw error
            }
        }
        console.log("retrying in 3 seconds");
        delay(3000)
    }
}

export default connectDB
import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection

    connection.on('connected', () => {
      console.log("MongoDB connectied");
    })

    connection.on('error', (err) => {
      console.log("Mongodb connection error ,please make sure is up and runing: " + err);
      process.exit()
    })
  } catch (error) {
    console.log("somethink went wrong in connecting DB");
    console.log(error)
  }

}
import mongoose from "mongoose";

export const dbConnect = () => mongoose.connect(process.env.MONGO_URI, {
    dbName: "my-Authentication",
}).then((c) => {
    console.log(`Database Connected with ${c.connection.host} `);
}).catch((e) => console.log(e));


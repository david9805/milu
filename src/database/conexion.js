import mongoose  from "mongoose";

let database = mongoose.connection;

console.log(process.env.COSMOSDB_DBNAME)

const url = `mongodb://${process.env.COSMOSDB_HOST}:${process.env.COSMOSDB_PORT}/${process.env.COSMOSDB_DBNAME}?ssl=true&replicaSet=globaldb&retrywrites=false`;

mongoose.connect(url, {
  auth: {
    username: process.env.COSMOSDB_USER,
    password: process.env.COSMOSDB_PASSWORD,
  },
  useNewUrlParser: true,
  //useFindAndModify: true,
  //useUnifiedTopology: true,
  //useCreateIndex: true,
});

database = mongoose.connection;

database.once("open", async () => {
  console.log("Connected to database");
});

database.on("error", () => {
  console.log("Error connecting to database");
});


export default mongoose
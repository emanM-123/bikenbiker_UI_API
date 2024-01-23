import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/product', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});   
export const connectToDatabase = () => {  
  const db = mongoose.connection;
  db.on("error",() => {
    console.log("MongoDB Connection Error");
  });
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};


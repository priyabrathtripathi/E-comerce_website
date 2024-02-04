import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
import cors from "cors"
import path from 'path'
import {fileURLToPath} from 'url';
//configure env
dotenv.config();

//database
connectDB();
//esmodule fix error
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//rest object
const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')))
//routes
app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes)
//rest api
// app.get("/", (req, res) => {
//   req.setEncoding({
//     message: "Welcome to Ecommerce app",
//   });
// });
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
});

//PORT

const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
//Nodemon)-> is a tool that develop Node.js based application by automatically researting the node applicaiton when file changes in the directory are detected.

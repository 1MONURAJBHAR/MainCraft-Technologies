import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/connectDb.js";
import ProductRouter from "./routes/product.routes.js";

const app = express();

app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

//Database Connection
await connectDB();

app.get("/", (req, res) => {
  res.status(200).send("Express Blog API is running successfully!");
});


app.use("/api/products", ProductRouter);

app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;

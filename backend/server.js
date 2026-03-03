import express from "express";
import userRoutes from "./routes/authRoutes.js";
import cors from "cors"
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
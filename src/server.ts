import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import formRoutes from "./routes/formRoutes";
import cors from "cors";

dotenv.config();

const app = express();

// Connect to DB
connectDB();

app.use(cors({ origin: "http://localhost:5173" }));
// Middleware
app.use(express.json());

// Routes
app.use("/api/forms", formRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port https://localhost:${PORT}`);
});

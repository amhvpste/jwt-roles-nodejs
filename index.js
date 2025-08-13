import express from 'express';
import mongoose from 'mongoose';
import authRouter from './authRouter.js';

const PORT = process.env.PORT || 5000;

const DB_URL = "your url";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);


const start = async () => {
  try {
    await mongoose.connect(DB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
  } catch (e) {
    console.error("❌ Error connecting to MongoDB:", e);
  }
};

start();

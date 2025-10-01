import dotenv from "dotenv";
import { connectDB } from "./config/db";
import app from "./app";

dotenv.config({ quiet: false });

const PORT = process.env.PORT || 4000;
const URL = process.env.URL || "http://localhost";

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`
                *************************************
                ***** 🚀 Servidor corriendo en  *****
                *******${URL}:${PORT}*************
                *************************************
    `);
  });
};

startServer();

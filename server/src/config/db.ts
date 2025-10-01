import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("Falta la variable de entorno");
    }

    await mongoose.connect(uri);

    console.log(` ******* Conectado a MongoDB ********`);
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

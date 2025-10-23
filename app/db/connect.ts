import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
	if (isConnected) return;

	try {
		const mongoUrl = process.env.MONGO_URL;
		console.log("Attempting MongoDB connection...");
		console.log("MONGO_URL available:", !!mongoUrl);
		if (!mongoUrl) {
			console.error(
				"Available env vars:",
				Object.keys(process.env).filter(
					(k) => k.includes("MONGO") || k.includes("mongo")
				)
			);
			throw new Error("MONGO_URL environment variable is not set");
		}

		await mongoose.connect(mongoUrl);
		isConnected = true;
		console.log("✅ MongoDB connected successfully");
	} catch (error) {
		console.error("❌ Failed to connect to MongoDB:", error);
		throw error;
	}
}

export function isDbConnected() {
	return isConnected && mongoose.connection.readyState === 1;
}

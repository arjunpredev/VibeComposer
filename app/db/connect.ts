import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
	if (isConnected) return;

	try {
		const mongoUrl = process.env.MONGO_URL;
		console.log("Attempting MongoDB connection...");
		console.log("MONGO_URL available:", !!mongoUrl);
		
		if (mongoUrl) {
			// Log a sanitized version (hide password)
			const sanitized = mongoUrl.replace(/:[^:/@]+@/, ":***@");
			console.log("Connection string format:", sanitized.substring(0, 50) + "...");
		}
		
		// Log all env vars that might be related
		console.log("Environment variables with MONGO:", 
			Object.keys(process.env).filter(k => k.toLowerCase().includes('mongo'))
		);
		
		if (!mongoUrl) {
			console.error(
				"Available env vars:",
				Object.keys(process.env).filter(
					(k) => k.includes("MONGO") || k.includes("mongo") || k.includes("DATABASE")
				)
			);
			throw new Error("MONGO_URL environment variable is not set");
		}

		console.log("Starting mongoose.connect()...");
		await mongoose.connect(mongoUrl, {
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 5000,
		});
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

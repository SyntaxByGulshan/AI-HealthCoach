
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env file manually since we don't have dotenv
const envPath = path.resolve(__dirname, "../.env");
let apiKey = "";

try {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);
    if (match) {
        apiKey = match[1].trim();
        if (apiKey.startsWith('"') && apiKey.endsWith('"')) {
            apiKey = apiKey.slice(1, -1);
        }
        if (apiKey.startsWith("'") && apiKey.endsWith("'")) {
            apiKey = apiKey.slice(1, -1);
        }
        console.log(`Read API Key: Length=${apiKey.length}, StartsWith=${apiKey.substring(0, 4)}...`);
    }
} catch (e) {
    console.error("Error reading .env file:", e);
}

if (!apiKey) {
    console.error("API Key not found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);





async function testModel() {
    console.log("Testing gemini-2.0-flash...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-2.0-flash:", result.response.text());
    } catch (e) {
        const errorLog = `Error with gemini-2.0-flash:\n${e.message}\n${JSON.stringify(e, null, 2)}`;
        fs.writeFileSync(path.join(__dirname, "error.txt"), errorLog);
        console.error("Error written to error.txt");
    }
}

testModel();





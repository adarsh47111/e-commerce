import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL;
const NODE_ENV = process.env.NODE_ENV;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export { PORT, DB_URL, NODE_ENV, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET };

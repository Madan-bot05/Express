// Corresponds to AppConfig.java's CORS configuration
export const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:4200",
    "http://localhost:1010"
  ],
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept",
  exposedHeaders: "Authorization"
};
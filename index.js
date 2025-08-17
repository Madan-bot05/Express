// This is the main Express application file.
import express from "express";
import sequelize from "./util/database.js"; // Import the database connection.
import Product from "./model/Product.js"; // Import the Product model.
import router from "./routes/products.js";

// --- SEQUELIZE SYNC ---
// Call .sync() on the imported sequelize instance to create the tables.
sequelize
  .sync({
    force: false, // Set to true to drop and re-create tables on startup.
  })
  .then(() => {
    console.log("Database and tables synced successfully!");
  })
  .catch((err) => console.log("Error syncing database:", err));

// --- EXPRESS.JS SETUP ---
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api',router)

// --- ROUTES ---
// Route to create a new product.

// Start the server.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

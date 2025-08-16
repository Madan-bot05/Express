// This is the main Express application file.
import express from 'express';
import sequelize from './util/database.js'; // Import the database connection.
import Product from './model/Product.js'; // Import the Product model.

// --- SEQUELIZE SYNC ---
// Call .sync() on the imported sequelize instance to create the tables.
sequelize.sync({
        force: false // Set to true to drop and re-create tables on startup.
    })
    .then(() => {
        console.log('Database and tables synced successfully!');
    })
    .catch(err => console.log('Error syncing database:', err));


// --- EXPRESS.JS SETUP ---
const app = express();
const PORT = 3000;

app.use(express.json());

// --- ROUTES ---
// // Route to create a new product.
// app.post('/api/products', (req, res) => {
//     // Use the imported Product model to create a new entry.
//     Product.create({
//             title: req.body.title,
//             price: req.body.price,
//             description: req.body.description
//         })
//         .then(result => {
//             console.log('Created Product:', result);
//             res.status(201).json({ message: 'Product created successfully!', product: result });
//         })
//         .catch(err => {
//             console.error('Error creating product:', err);
//             res.status(500).json({ message: 'Failed to create product.', error: err });
//         });
// });

// // Route to get all products.
// app.get('/api/products', (req, res) => {
//     // Use the imported Product model to find all entries.
//     Product.findAll()
//         .then(products => {
//             res.status(200).json(products);
//         })
//         .catch(err => {
//             console.error('Error fetching products:', err);
//             res.status(500).json({ message: 'Failed to fetch products.', error: err });
//         });
// });


// Start the server.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// // Import required modules
// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config();

// // Initialize Express app
// const app = express();
// const port = process.env.PORT || 9000;

// // CORS configuration
// const corsOptions = {
//     origin: [
//         'http://localhost:5173',
//         'http://localhost:5174',
//         'http://localhost:9000',
//         'https://scic-jobtask-server-rose.vercel.app',
//         'https://solosphere-90d2d.web.app'
//     ],
//     credentials: true,
//     optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// // MongoDB connection URI and client setup
// // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fdffxhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fdffxhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// // Main function to handle async operations
// async function run() {
//     try {
//         // Connect to MongoDB
//         await client.db("admin").command({ ping: 1 });
//         console.log("Successfully connected to MongoDB!");

//         // Get reference to the products collection
//         const productsCollection = client.db('productsDB').collection('products');

     
//         app.get('/products', async (req, res) => {
//             try {
//                 const size = parseInt(req.query.size) || 6; // Default to 6 if not provided
//                 const page = (parseInt(req.query.page) || 1) - 1; // Default to 0 if not provided
//                 const search = req.query.search || '';
//                 const sort = req.query.sort || '';
//                 const filter = req.query.filter || '';
        
//                 let query = {
//                     ProductName: { $regex: search, $options: 'i' }
//                 };
        
//                 // Apply filters
//                 if (filter) {
//                     if (filter.startsWith('PriceRange')) {
//                         const priceRange = filter.replace('PriceRange', '');
//                         if (priceRange === '1') {
//                             query.Price = { $gte: 0, $lte: 1000 };
//                         } else if (priceRange === '2') {
//                             query.Price = { $gte: 1001, $lte: 2000 };
//                         } else if (priceRange === '3') {
//                             query.Price = { $gte: 2001, $lte: 3000 };
//                         }
//                     } else if (filter.startsWith('BrandName')) {
//                         const brandName = filter.replace('BrandName', '');
//                         query.BrandName = brandName;
//                     } else {
//                         query.Category = filter;
//                     }
//                 }
        
//                 // Sorting options based on query parameter
//                 const sortOptions = {};
//                 if (sort === 'asc') {
//                     sortOptions.Price = 1;
//                 } else if (sort === 'desc') {
//                     sortOptions.Price = -1;
//                 } else if (sort === 'dateAsc') {
//                     sortOptions.CreationDateTime = 1;
//                 } else if (sort === 'dateDesc') {
//                     sortOptions.CreationDateTime = -1;
//                 }
        
//                 const options = {
//                     sort: sortOptions
//                 };
        
//                 // Fetch products from MongoDB with filtering, sorting, and pagination
//                 const result = await productsCollection.find(query, options).skip(page * size).limit(size).toArray();
//                 res.send(result);
//             } catch (err) {
//                 console.error("Error fetching products:", err);
//                 res.status(500).send({ error: 'Error fetching products' });
//             }
//         });
        

//         app.get('/products-count', async (req, res) => {
//             try {
//                 const search = req.query.search || '';
//                 const filter = req.query.filter || '';

//                 let query = {
//                     ProductName: { $regex: search, $options: 'i' }
//                 };

//                 // Apply filters
//                 if (filter) {
//                     if (filter.startsWith('Price')) {
//                         const priceRange = filter.replace('Price', '');
//                         if (priceRange === '1') {
//                             query.Price = { $gte: 0, $lte: 1000 };
//                         } else if (priceRange === '2') {
//                             query.Price = { $gte: 1001, $lte: 2000 };
//                         } else if (priceRange === '3') {
//                             query.Price = { $gte: 2001, $lte: 3000 };
//                         }
//                     } else if (filter.startsWith('BrandName')) {
//                         const brandName = filter.replace('BrandName', '');
//                         query.BrandName = brandName;
//                     } else {
//                         query.Category = filter;
//                     }
//                 }

//                 // Get total count of products matching the query
//                 const count = await productsCollection.countDocuments(query);
//                 res.send({ count });
//             } catch (err) {
//                 console.error("Error fetching product count:", err);
//                 res.status(500).send({ error: 'Error fetching product count' });
//             }
//         });

//         //     try {
//         //         const search = req.query.search || '';
//         //         const filter = req.query.filter || '';
        
//         //         let query = {
//         //             ProductName: { $regex: search, $options: 'i' }
//         //         };
        
//         //         // Apply filters
//         //         if (filter) {
//         //             if (filter.startsWith('PriceRange')) {
//         //                 const priceRange = filter.replace('PriceRange', '');
//         //                 if (priceRange === '1') {
//         //                     query.Price = { $gte: 0, $lte: 1000 };
//         //                 } else if (priceRange === '2') {
//         //                     query.Price = { $gte: 1001, $lte: 2000 };
//         //                 } else if (priceRange === '3') {
//         //                     query.Price = { $gte: 2001, $lte: 3000 };
//         //                 }
//         //             } else if (filter.startsWith('BrandName')) {
//         //                 const brandName = filter.replace('BrandName', '');
//         //                 query.BrandName = brandName;
//         //             } else {
//         //                 query.Category = filter;
//         //             }
//         //         }
        
//         //         // Get total count of products matching the query
//         //         const count = await products.countDocuments(query);
//         //         res.send({ count });
//         //     } catch (err) {
//         //         console.error("Error fetching product count:", err);
//         //         res.status(500).send({ error: 'Error fetching product count' });
//         //     }
//         // });
        


//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//     }
// }

// // Run the async function and catch any errors
// run().catch(console.dir);

// // Simple endpoint to test server
// app.get('/', (req, res) => {
//     res.send('Hello from Connect....');
// });

// // Start the Express server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });





const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fdffxhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fdffxhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const productsCollection = client.db("productsDB").collection("allProducts");

        app.get('/allProducts', async (req, res) => {
            const size = parseInt(req.query.size) || 10;
            const page = parseInt(req.query.page) - 1 || 0;
            const filter = req.query.filter || '';
            const sort = req.query.sort || '';
            const search = req.query.search || '';
        
            let query = {
                ProductName: { $regex: search, $options: 'i' },
            };
        
            // Filter by category or brand name
            if (filter) {
                if (filter.startsWith('PriceRange')) {
                    const priceRange = filter.replace('PriceRange', '');
                    if (priceRange === '1') query.Price = { $gte: 0, $lte: 1000 };
                    else if (priceRange === '2') query.Price = { $gte: 1001, $lte: 2000 };
                    else if (priceRange === '3') query.Price = { $gte: 2001, $lte: 3000 };
                } else if (filter.startsWith('BrandName')) {
                    const brandName = filter.replace('BrandName', '');
                    query.BrandName = brandName;
                } else {
                    query.Category = filter;
                }
            }
        
            const options = sort ? { sort: { Price: sort === 'asc' ? 1 : -1 } } : {};
        
            try {
                const result = await productsCollection.find(query, options).skip(page * size).limit(size).toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            }
        });
        

        app.get('/productCount', async (req, res) => {
            const filter = req.query.filter || '';
            const search = req.query.search || '';
        
            let query = {
                ProductName: { $regex: search, $options: 'i' },
            };
        
            if (filter) {
                if (filter.startsWith('PriceRange')) {
                    const priceRange = filter.replace('PriceRange', '');
                    if (priceRange === '1') query.Price = { $gte: 0, $lte: 1000 };
                    else if (priceRange === '2') query.Price = { $gte: 1001, $lte: 2000 };
                    else if (priceRange === '3') query.Price = { $gte: 2001, $lte: 3000 };
                } else if (filter.startsWith('BrandName')) {
                    const brandName = filter.replace('BrandName', '');
                    query.BrandName = brandName;
                } else {
                    query.Category = filter;
                }
            }
        
            try {
                const count = await productsCollection.countDocuments(query);
                res.send({ count });
            } catch (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            }
        });
        

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Products server is running");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
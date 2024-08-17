// Import required modules
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 9000;

// CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://scic-jobtask-server-rose.vercel.app',
        'https://scic-jobtask-client.vercel.app',
        'https://solosphere-90d2d.web.app'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection URI and client setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fdffxhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Main function to handle async operations
async function run() {
    try {
        // Connect to MongoDB
        await client.db("admin").command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");

        // Get reference to the products collection
        const products = client.db('productsDB').collection('products');

        // Endpoint to get products with pagination, sorting, and filtering
        app.get('/products', async (req, res) => {
            try {
                const size = parseInt(req.query.size) || 6; // Default to 6 if not provided
                const page = (parseInt(req.query.page) || 1) - 1; // Default to 0 if not provided

                const filter = req.query;
                const query = {
                    ProductName: {
                        $regex: filter.search || '', // Default to an empty string if no search term
                        $options: 'i'
                    }
                };

                // Sorting options based on query parameter
                const sortOptions = {};
                if (filter.sort === 'asc') {
                    sortOptions.Price = 1;
                } else if (filter.sort === 'desc') {
                    sortOptions.Price = -1;
                } else if (filter.sort === 'dateAsc') {
                    sortOptions.CreationDateTime = 1;
                } else if (filter.sort === 'dateDesc') {
                    sortOptions.CreationDateTime = -1;
                }

                const options = {
                    sort: sortOptions
                };

                // Fetch products from MongoDB with pagination and sorting
                const result = await products.find(query, options).skip(page * size).limit(size).toArray();
                res.send(result);
            } catch (err) {
                console.error("Error fetching products:", err);
                res.status(500).send({ error: 'Error fetching products' });
            }
        });

        // Endpoint to get total count of products
        app.get('/products-count', async (req, res) => {
            try {
                const count = await products.countDocuments();
                res.send({ count });
            } catch (err) {
                console.error("Error fetching product count:", err);
                res.status(500).send({ error: 'Error fetching product count' });
            }
        });

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

// Run the async function and catch any errors
run().catch(console.dir);

// Simple endpoint to test server
app.get('/', (req, res) => {
    res.send('Hello from Connect....');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

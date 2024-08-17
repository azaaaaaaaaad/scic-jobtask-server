const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 9000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const app = express()
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://scic-jobtask-server-rose.vercel.app',
        'https://scic-jobtask-client.vercel.app',
        'https://solosphere-90d2d.web.app'
    ],
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fdffxhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        const products = client.db('productsDB').collection('products')



        app.get('/products', async (req, res) => {
            const size = parseInt(req.query.size) || 6; // Default to 6 if not provided
            const page = parseInt(req.query.page) - 1 || 0; // Default to 0 if not provided
        
            const filter = req.query;
            console.log(filter);
        
            const query = {
                ProductName: {
                    $regex: filter.search || '', // Default to an empty string if no search term
                    $options: 'i'
                }
            };
        
            const sortOptions = {};
        
            // Add sorting logic based on filter.sort
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
        
            try {
                const result = await products.find(query, options).skip(page * size).limit(size).toArray();
                res.send(result);
            } catch (err) {
                console.error("Error fetching products:", err);
                res.status(500).send({ error: 'Error fetching products' });
            }
        });
        
       

        app.get('/products-count', async (req, res) => {
            const count = await products.countDocuments()
            res.send({ count })
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello from Connect....')
})

app.listen(port, () => console.log(`Server running on port ${port}`))



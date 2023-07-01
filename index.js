const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req,res)=>{
    res.send("hi hello")
});
app.use(cors());
app.use(express.json());
require('dotenv').config()


//////////////////////


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p7jtpy2.mongodb.net/?retryWrites=true&w=majority`;

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
    const productCollection = client.db('food').collection('products');
    const dronkCollection = client.db('food').collection('dronk-product');


    app.get('/product', async (req, res) => {
        const query = {};
        const cursor = productCollection.find(query).limit(6);
        const products = await cursor.toArray();
        res.send(products)
      });
      app.get('/products', async (req, res) => {
        const query = {};
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products)
      });


      app.get('/drink', async(req, res)=>{
        const query = {};
        const result = await dronkCollection.find(query).limit(6).toArray();
        res.send(result)
      })



  } finally {

  }
}
run().catch(console.dir);


//////////////////////

app.listen(port,()=>{
    console.log(`hi hello ${port}`)
})
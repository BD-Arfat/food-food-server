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


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const sponsorCollection = client.db('food').collection('sponsor');
    const reviewsCollection = client.db('food').collection('reviews');


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
      app.get('/products/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const service = await productCollection.findOne(query);
        res.send(service)
      });


      // reviews 

      app.post('/reviews', async(req, res)=>{
        const user = req.body;
        const result = await reviewsCollection.insertOne(user);
        res.send(result)
      });

      app.get('/reviews', async(req, res)=>{
        const query = {};
        const cursor = await reviewsCollection.find(query).toArray();
        res.send(cursor);
      });

      // app.get('/reviews/:id', async(req, res)=>{
      //   const productId = req.params.id;
      //   const query = {productId : productId};
      //   const result = await reviewsCollection.findOne(query);
      //   res.send(result)
      // })

      app.get('/reviews/:id',async(req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await reviewsCollection.findOne(query);
        res.send(result)
      })

      // end reviews 
      // my reviews
      app.get('/reviews', async(req, res)=>{
        const email = req.params.email;
        const query = {email : email};
        const result = await reviewsCollection.find(query).toArray();
        res.send(result)
      })

      app.delete('/reviews/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await reviewsCollection.deleteOne(query);
        res.send(result)
      })

      // end my reviews


      app.get('/drink', async(req, res)=>{
        const query = {};
        const result = await dronkCollection.find(query).limit(6).toArray();
        res.send(result)
      });
      app.get('/drinks', async(req, res)=>{
        const query = {};
        const result = await dronkCollection.find(query).toArray();
        res.send(result)
      })
      app.get('/drinks/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const service = await dronkCollection.findOne(query);
        res.send(service)
      })

      app.get('/sponsors', async(req, res)=>{
        const query = {};
        const result = await sponsorCollection.find(query).toArray();
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
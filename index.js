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
    
  } finally {}
}
run().catch(console.dir);


//////////////////////

app.listen(port,()=>{
    console.log(`hi hello ${port}`)
})
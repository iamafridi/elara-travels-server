const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;


// MiddleWare
app.use(cors());
app.use(express.json());

// MONGOBD STARTS HERE

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7grn8zj.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const serviceCollection = client.db('elaraTravels').collection('services');
const reviewsollection = client.db('elaraTravels').collection('reviews');

// getting the Service data
app.get('/services',async(req,res)=>{
    const result = await serviceCollection.find().toArray();
    res.send(result);
})
// getting the Reviews data
app.get('/reviews',async(req,res)=>{
    const result = await reviewsollection.find().toArray();
    res.send(result);
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




// MOPNGODB ENDS HERE 

app.get('/',(req,res)=>{
    res.send('ELARA TRAVEL IS TRAVELLING')
})
app.listen(port, ()=>{
    console.log(`ELARA TRAVEL IS TRAVELLING ON PORT ${port}`);
})
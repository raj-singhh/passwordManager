const express = require('express')
const {MongoClient} = require('mongodb')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')



const uri = process.env.MONGO_URI
const client = new MongoClient(uri)
const dbName = 'pwdmgr'

const app = express()
const port = 5000

client.connect();
const db = client.db(dbName);

app.use(bodyParser.json())
app.use(cors())
//fetch all passwords
app.get('/', async(req, res) => {
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.send(findResult)
})
//save a password
app.post('/', async(req, res) => {
    let password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
  res.status(201).send({success: true , message: "password saved successfully"})
})

//Delete a password
app.delete('/', async(req, res) => {
    let password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
  res.status(201).send({success: true , message: "password deleted successfully"})
})

app.listen(port, () => {
  console.log(`Exampl app lisening on port http://localhost:${port}`)
})
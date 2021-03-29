const express = require('express');
const app = express();
const port = 5000;
// const allData = require('./allData')

// require env variables
require('dotenv').config();

// middleware import
const bodyParser = require('body-parser');
const cors = require('cors');

// apply middlewares
app.use(bodyParser.json());
app.use(cors());

// require mongoClient
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rqnu2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });


// handle maongo requests
// use connect method to to connect to the server
MongoClient.connect(url, function(err, client) {
	console.log('connection successful');

	// define database collection
	const eventsCollection = client.db(process.env.DB_NAME).collection('events');
	// handle events data request
	app.get('/events', (req, res) => {
		eventsCollection.find({})
		.toArray((err, documents) => {
			res.send(documents);
		})
	})
}) 

// handle general requests
app.get('/', (req, res) => {
	res.send('Hello World!');
});


// listing port
app.listen(port)
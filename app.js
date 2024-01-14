// app.js
import express from 'express';
import { connect } from 'mongoose';
import json from 'body-parser';
import Car from '../tbros/model.js';
import bodyParser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
connect('mongodb://127.0.0.1:27017/carservice', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/cars', async (req, res) => {
  const { make, model, year } = req.body;

  try {
    const newCar = new Car({ make, model, year });
    const savedCar = await newCar.save();
    res.json(savedCar);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send("dfjsdfkds");
});

app.post('/seedData', async (req, res) => {
  const seedData = [
    { "make": "Toyota", "model": "Camry", "year": 2022 },
    { "make": "Honda", "model": "Civic", "year": 2021 },
    { "make": "Ford", "model": "Fusion", "year": 2023 }
  ];

  try {
    const insertedCars = await Car.insertMany(seedData);
    res.json({ message: 'Seed data added successfully', cars: insertedCars });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/seedData2', async (req, res) => {
    const seedData = req.body.map(car => ({
        _id: car._id.$oid, // Extract the $oid value
        make: car.make,
        model: car.model,
        year: car.year,
      }));
  console.log(req.body);
    try {
      // Use insertMany with specified _id values
      const insertedCars = await Car.insertMany(seedData,{ordered:false});
      res.json({ message: 'Seed data added successfully', cars: insertedCars });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
